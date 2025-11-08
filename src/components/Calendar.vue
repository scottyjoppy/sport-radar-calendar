<script setup>
import AddEventForm from "@/components/AddEventForm.vue";
import { useEvents } from "@/composables/useEvents";
import { offsetArray } from "@/utils/arrayHelpers";
import { MONTHS, WEEKDAYS } from "@/utils/calendar";
import {
  getSportName,
  getTeamAbbr,
  getTournamentName,
  getVenueName,
} from "@/utils/dataHelpers";
import { dayToUTCDay, getDateArray } from "@/utils/dateHelpers";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

const { events } = useEvents();

const startMonday = ref(true);
const localDate = ref(new Date());
const selectedDay = ref(new Date());
const selectedDayEvents = ref([]);
const showDetailsId = ref(null);
const selectedEventDetails = ref(null);

const allDates = computed(() => {
  return getDateArray(
    localDate.value.getFullYear(),
    localDate.value.getMonth(),
    startMonday.value
  );
});

const isExpandedRows = computed(() => {
  if (
    allDates.value.length > 35 &&
    allDates.value[allDates.value.length - 7].getDate() > 20
  )
    return true;

  return false;
});

const displayedDates = computed(() => {
  return isExpandedRows.value ? allDates.value : allDates.value.slice(0, -7);
});

const weekDays = computed(() =>
  startMonday.value ? offsetArray(WEEKDAYS) : WEEKDAYS
);

const upMonth = () => {
  selectedDay.value = new Date(
    selectedDay.value.getFullYear(),
    selectedDay.value.getMonth() + 1
  );
};

const downMonth = () => {
  selectedDay.value = new Date(
    selectedDay.value.getFullYear(),
    selectedDay.value.getMonth() - 1
  );
};

const flipStart = () => (startMonday.value = !startMonday.value);

const changeSelectedDate = async (day) => {
  selectedDay.value = day;
};

const eventsForDay = (day) => {
  const dayString = day.toISOString().slice(0, 10);
  return events.value.filter((e) => e.event_day === dayString);
};

const showDetails = (eventId) => {
  if (showDetailsId.value === eventId) {
    closeDetails();
  } else {
    showDetailsId.value = eventId;
    selectedEventDetails.value = events.value.find(
      (e) => e.event_id === eventId
    );
  }
};

const closeDetails = () => {
  showDetailsId.value = null;
  selectedEventDetails.value = null;
};

const handleKeydown = (e) => {
  if (e.key === "Escape") closeDetails();
};

const handleClickOutside = (e) => {
  const detailsEl = document.querySelector(".details-modal");
  if (detailsEl && !detailsEl.contains(e.target)) {
    closeDetails();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("click", handleClickOutside);
  selectedDayEvents.value = eventsForDay(dayToUTCDay(localDate.value));
});

watch(selectedDay, (newDay) => {
  selectedDayEvents.value = eventsForDay(dayToUTCDay(newDay));
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped src="/src/assets/calendar.css"></style>

<template>
  <div class="combined-calendar-grid">
    <!-- Side Bar -->
    <section class="calendar-side-bar">
      <!-- Side Bar Top -->
      <div class="side-bar-top-container">
        <div class="current-day-container">
          <div class="uppercase font-bold">
            {{ MONTHS[selectedDay.getMonth()] }}
          </div>
          <div>{{ selectedDay.getDate() }}</div>
          <div>{{ selectedDay.getFullYear() }}</div>
        </div>
        <div class="top-btn-container">
          <button @click="downMonth" class="selector-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M33.17 17.17 24 26.34l-9.17-9.17L12 20l12 12 12-12z" />
              <path d="M0 0h48v48H0z" fill="none" />
            </svg>
          </button>
          <button @click="upMonth" class="selector-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path d="M33.17 17.17 24 26.34l-9.17-9.17L12 20l12 12 12-12z" />
              <path d="M0 0h48v48H0z" fill="none" />
            </svg>
          </button>
        </div>
      </div>
      <!-- Side Bar Body -->
      <div class="side-bar-container">
        <div
          v-if="events.length"
          v-for="(event, i) in selectedDayEvents"
          :key="i"
          class="event-row"
          @click.stop="showDetails(event.event_id)"
        >
          <h3 class="flex gap-2">
            <span class="capitalize">
              {{ getTeamAbbr(event.home_team) }}
            </span>
            <span class="lowercase">vs</span>
            <span class="capitalize">
              {{ getTeamAbbr(event.away_team) }}
            </span>
            <span>
              {{ event.event_day }}
            </span>
          </h3>
        </div>
      </div>
      <!-- Side Bar Bottom -->
      <div class="btn-container">
        <button @click="flipStart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="switch-btn"
          >
            <path
              d="M8 7h12m0 0-4-4m4 4-4 4m0 6H4m0 0 4 4m-4-4 4-4"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </button>
      </div>
    </section>
    <template v-if="selectedEventDetails">
      <div class="details-modal popup-events">
        <div class="popup-content">
          <h2 class="popup-title">
            {{ getTeamAbbr(selectedEventDetails.home_team) }}
            vs
            {{ getTeamAbbr(selectedEventDetails.away_team) }}
          </h2>
          <p class="popup-row">
            <span class="popup-description">Date:</span>
            <span>{{ selectedEventDetails.event_day }}</span>
          </p>
          <p class="popup-row">
            <span class="popup-description">Time:</span>
            <span>{{ selectedEventDetails.event_time }}</span>
          </p>
          <p class="popup-row">
            <span class="popup-description">Venue:</span>
            <span>{{ getVenueName(selectedEventDetails.venue_id) }}</span>
          </p>
          <p class="popup-row">
            <span class="popup-description">Sport:</span>
            <span class="capitalize">{{
              getSportName(selectedEventDetails.sport_id)
            }}</span>
          </p>
          <p v-if="selectedEventDetails.tournament_id" class="popup-row">
            <span class="popup-description">Tournament:</span>
            <span>{{
              getTournamentName(selectedEventDetails.tournament_id)
            }}</span>
          </p>
        </div>
        <button class="popup-btn" @click="showDetails(null)">Close</button>
      </div>
    </template>

    <!-- Main Calendar -->
    <section class="flex justify-center">
      <div
        class="calendar-grid"
        :style="{
          gridTemplateRows: isExpandedRows
            ? '2rem repeat(6, 5fr)'
            : '2rem repeat(5, 5fr)',
        }"
      >
        <div class="calendar-day" v-for="weekDay in weekDays">
          <span class="full">{{ weekDay }}</span>
          <span class="abbr">{{ weekDay.slice(0, 3) }}</span>
        </div>
        <div
          v-for="(day, index) in displayedDates"
          :key="index"
          class="calendar-cell"
          @click="changeSelectedDate(day)"
        >
          <div class="calendar-cell-date">
            {{ day.getDate() }}
          </div>
          <div class="dot-container">
            <span
              v-for="(_, i) in eventsForDay(day).slice(0, 3)"
              :key="i"
              class="dot"
            ></span>
          </div>
        </div>
      </div>
    </section>
  </div>
  <AddEventForm></AddEventForm>
</template>
