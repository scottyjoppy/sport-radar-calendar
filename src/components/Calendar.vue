<script setup>
import { useEvents } from "@/composables/useEvents";
import { offsetArray } from "@/utils/arrayHelpers";
import { MONTHS, WEEKDAYS } from "@/utils/calendar";
import { dayToUTCDay, getDateArray, inputDateFormat } from "@/utils/dateHelpers";
import { computed, onMounted, ref, watch } from "vue";

const { events } = useEvents();

const startMonday = ref(true);
const localDate = ref(new Date());
const selectedDay = ref(new Date());
const selectedDayEvents = ref([]);

const formattedDate = computed(() => inputDateFormat(localDate));

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

// TESTING
const upMonth = () => {
  localDate.value = new Date(
    localDate.value.getFullYear(),
    localDate.value.getMonth() + 1
  );
};
const downMonth = () => {
  localDate.value = new Date(
    localDate.value.getFullYear(),
    localDate.value.getMonth() - 1
  );
};
const flipStart = () => (startMonday.value = !startMonday.value);
// TESTING

const changeSelectedDate = async (day) => {
  selectedDay.value = day;
};

const eventsForDay = (day) => {
  const dayString = day.toISOString().slice(0, 10);
  return events.value.filter((e) => e.event_day === dayString);
};

onMounted(() => {
  selectedDayEvents.value = eventsForDay(dayToUTCDay(localDate.value));
});

watch(selectedDay, (newDay) => {
  selectedDayEvents.value = eventsForDay(dayToUTCDay(newDay));
});
</script>

<template>
  <div class="combined-calendar-grid">
    <section class="calendar-side-bar">
      <div class="border-b border-(--grey) flex justify-between px-1">
        <div>{{ MONTHS[localDate.getMonth()] }}</div>
        <div>{{ localDate.getDate() }}</div>
        <div>{{ localDate.getFullYear() }}</div>
      </div>
      <input type="date" :value="formattedDate" />
      <div v-if="events.length === 0">nothin</div>
      <div v-else v-for="(event, i) in selectedDayEvents" :key="i">
        {{ event.event_day }}
        {{ event.event_time }}
      </div>
      <div class="button-container">
        <button @click="flipStart" class="simple-button">flip</button>
        <button @click="upMonth" class="simple-button">up</button>
        <button @click="downMonth" class="simple-button">down</button>
      </div>
    </section>
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
          <div class="col-span-full row-span-1 justify-self-center self-center">
            {{ day.getDate() }}
          </div>
          <div class="col-span-full p-1 justify-self-center dot-container">
            <span
              v-for="(_, i) in eventsForDay(day)"
              :key="i"
              class="dot"
            ></span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
