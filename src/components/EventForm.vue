<script setup>
import { useEvents } from "@/composables/useEvents";
import { useSports } from "@/composables/useSports";
import { useTeams } from "@/composables/useTeams";
import { useTournaments } from "@/composables/useTournaments";
import { useVenues } from "@/composables/useVenues";
import {
  getSportName,
  getTeamAbbr,
  getTeamName,
  getTournamentName,
  getVenueName,
} from "@/utils/dataHelpers";
import { computed, ref } from "vue";

const { events, addEvents, updateEvents, deleteEvents } = useEvents();
const { sports } = useSports();
const { teams } = useTeams();
const { venues } = useVenues();
const { tournaments } = useTournaments();

const homeTeam = ref("");
const awayTeam = ref("");
const eventDay = ref("");
const eventTime = ref("");
const sportId = ref("");
const tournamentId = ref("");
const venueId = ref("");

const editingId = ref(null);
const newEventForm = ref(false);
const expandEventsId = ref(null);

const editedEvent = ref({
  home_team: "",
  away_team: "",
  event_day: "",
  event_time: "",
  sport_id: "",
  venue_id: "",
  tournament_id: "",
});

const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => {
    const dateA = new Date(`${a.event_day}T${a.event_time}`);
    const dateB = new Date(`${b.event_day}T${b.event_time}`);
    return dateA - dateB;
  });
});

const onSubmit = async () => {
  if (
    !homeTeam.value ||
    !awayTeam.value ||
    !eventDay.value ||
    !eventTime.value ||
    !sportId.value ||
    !venueId.value
  )
    return;

  const newEvent = {
    home_team: homeTeam.value,
    away_team: awayTeam.value,
    event_day: eventDay.value,
    event_time: eventTime.value,
    sport_id: sportId.value,
    venue_id: venueId.value,
    tournament_id: tournamentId.value || null,
  };

  await addEvents(newEvent);

  homeTeam.value = "";
  awayTeam.value = "";
  eventDay.value = "";
  eventTime.value = "";
  sportId.value = "";
  venueId.value = "";
  tournamentId.value = "";
  newEventForm.value = false;
};

const expandEvents = (event) => {
  expandEventsId.value =
    expandEventsId.value === event.event_id ? null : event.event_id;
};

const cancelEdit = () => {
  editingId.value = null;
};

const startEditing = (event) => {
  editingId.value = event.event_id;
  editedEvent.value = { ...event };
};

const saveEdit = async (id) => {
  await updateEvents(id, {
    home_team: editedEvent.value.home_team,
    away_team: editedEvent.value.away_team,
    event_day: editedEvent.value.event_day,
    event_time: editedEvent.value.event_time,
    sport_id: editedEvent.value.sport_id,
    venue_id: editedEvent.value.venue_id,
    tournament_id: editedEvent.value.tournament_id || null,
  });

  editingId.value = null;
};
</script>

<style scoped src="/src/assets/form.css"></style>

<template>
  <!-- Full Form -->
  <section class="form-section-container">
    <h1>Events</h1>
    <!-- Existing Data -->
    <section class="items-table">
      <div
        v-for="event in sortedEvents"
        :key="event.event_id"
        class="items-row"
      >
        <!-- View Editing -->
        <template v-if="editingId === event.event_id">
          <!-- Update Form -->
          <form
            class="edit-form-container"
            @submit.prevent="saveEdit(event.event_id)"
          >
            <div class="edit-form">
              <div class="edit-form-row">
                <label class="underline">Home Team</label>
                <select v-model="editedEvent.home_team" class="form-input">
                  <option
                    v-for="team in teams"
                    :key="team.team_id"
                    :value="team.team_id"
                    required
                  >
                    {{ team.team_name }}
                  </option>
                </select>
              </div>
              <div class="edit-form-row">
                <label class="underline">Away Team</label>
                <select v-model="editedEvent.away_team" class="form-input">
                  <option
                    v-for="team in teams"
                    :key="team.team_id"
                    :value="team.team_id"
                    required
                  >
                    {{ team.team_name }}
                  </option>
                </select>
              </div>
              <div class="edit-form-row">
                <label class="underline">Date</label>
                <input
                  v-model="editedEvent.event_day"
                  type="date"
                  class="form-input"
                  required
                />
              </div>
              <div class="edit-form-row">
                <label class="underline">Time</label>
                <input
                  v-model="editedEvent.event_time"
                  type="time"
                  class="form-input"
                  required
                />
              </div>
              <div class="edit-form-row">
                <label class="underline">Venue</label>
                <select v-model="editedEvent.venue_id" class="form-input">
                  <option
                    v-for="venue in venues"
                    :key="venue.venue_id"
                    :value="venue.venue_id"
                    required
                  >
                    {{ venue.venue_name }}
                  </option>
                </select>
              </div>
              <div class="edit-form-row">
                <label class="underline">Tournament</label>
                <select v-model="editedEvent.venue_id" class="form-input">
                  <option
                    v-for="tournament in tournaments"
                    :key="tournament.tournament_id"
                    :value="tournament.tournament_id"
                    required
                  >
                    {{ tournament.tournament_name }}
                  </option>
                </select>
              </div>
              <div class="edit-form-row">
                <label class="underline">Sport</label>
                <select v-model="editedEvent.sport_id" class="form-input">
                  <option
                    v-for="sport in sports"
                    :key="sport.sport_id"
                    :value="sport.sport_id"
                    required
                  >
                    {{ sport.sport_name }}
                  </option>
                </select>
              </div>
            </div>
            <!-- Buttons -->
            <div class="form-btn-container">
              <button class="form-btn-expand" type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 32 13.7 32 32z"
                  />
                </svg>
              </button>
              <button @click="cancelEdit" class="form-btn-expand">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="svg-style rotate-45"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </template>
        <!-- View Not Editing -->
        <template v-else>
          <div class="data-container">
            <!-- View Expanded -->
            <template v-if="expandEventsId === event.event_id">
              <h3>
                <span class="h3-title">Home Team:</span
                ><span>{{ getTeamName(event.home_team) }}</span>
              </h3>
              <h3>
                <span class="h3-title">Away Team:</span
                ><span>{{ getTeamName(event.away_team) }}</span>
              </h3>
              <h3>
                <span class="h3-title">When:</span>
                <span class="font-bold">{{ event.event_day }}</span>
                -
                <span class="font-bold">{{ event.event_time }}</span>
              </h3>
              <h3>
                <span class="h3-title">Where:</span
                ><span>{{ getVenueName(event.venue_id) }}</span>
              </h3>
              <h3>
                <span class="h3-title">Sport:</span>
                <span>
                  {{ getSportName(event.sport_id) }}
                </span>
              </h3>
              <!-- Tournaments Optional -->
              <template v-if="event.tournament_id">
                <h3>
                  <span class="h3-title">Tournament:</span>
                  <span>{{ getTournamentName(event.tournament_id) }}</span>
                </h3>
              </template>
            </template>
            <!-- View Not Expanded -->
            <template v-else>
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
            </template>
          </div>
          <!-- Buttons -->
          <div class="form-btn-container">
            <button
              @click="expandEvents(event)"
              :class="
                expandEventsId === event.event_id
                  ? 'form-btn-expand'
                  : 'form-btn'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                :class="expandEventsId === event.event_id ? 'rotate-180' : ''"
              >
                <path d="M33.17 17.17 24 26.34l-9.17-9.17L12 20l12 12 12-12z" />
                <path d="M0 0h48v48H0z" fill="none" />
              </svg>
            </button>
            <button
              @click="startEditing(event)"
              :class="
                expandEventsId === event.event_id
                  ? 'form-btn-expand'
                  : 'form-btn'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                class="svg-style"
              >
                <path
                  d="m18.988 2.012 3 3L19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z"
                />
                <path
                  d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z"
                />
              </svg>
            </button>
            <template v-if="expandEventsId !== event.event_id">
              <button @click="deleteEvents(event.event_id)" class="form-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <g data-name="Layer 2">
                    <path
                      d="M20 29h-8a5 5 0 0 1-5-5V12a1 1 0 0 1 2 0v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V12a1 1 0 0 1 2 0v12a5 5 0 0 1-5 5ZM26 9H6a1 1 0 0 1 0-2h20a1 1 0 0 1 0 2Z"
                    />
                    <path
                      d="M20 9h-8a1 1 0 0 1-1-1V6a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2a1 1 0 0 1-1 1Zm-7-2h6V6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1ZM14 23a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1ZM18 23a1 1 0 0 1-1-1v-7a1 1 0 0 1 2 0v7a1 1 0 0 1-1 1Z"
                    />
                  </g>
                  <path style="fill: none" d="M0 0h32v32H0z" />
                </svg>
              </button>
            </template>
          </div>
        </template>
      </div>
    </section>
    <!-- Add New Form -->
    <section class="add-btn-container-large">
      <div
        class="plus-btn-container-large"
        @click="newEventForm = !newEventForm"
        :class="[
          newEventForm ? 'plus-btn-large-show' : 'plus-btn-large-hidden',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="svg-style"
          viewBox="0 0 32 32"
        >
          <path
            d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
          />
        </svg>
      </div>

      <div
        class="input-container-large"
        :class="
          newEventForm
            ? 'input-container-large-show'
            : 'input-container-large-hidden'
        "
      >
        <form class="form-container-large" @submit.prevent="onSubmit">
          <div class="form-container-large-row">
            <label class="underline">Home Team</label>
            <select v-model="homeTeam" class="my-input-large" required>
              <option disabled value="">Select a team</option>
              <option
                v-for="team in teams"
                :key="team.team_id"
                :value="team.team_id"
              >
                {{ team.team_name }}
              </option>
            </select>
          </div>
          <div class="form-container-large-row">
            <label class="underline">Away Team</label>
            <select v-model="awayTeam" class="my-input-large" required>
              <option disabled value="">Select a team</option>
              <option
                v-for="team in teams"
                :key="team.team_id"
                :value="team.team_id"
              >
                {{ team.team_name }}
              </option>
            </select>
          </div>
          <div class="form-container-large-row">
            <label>Date</label>
            <input
              type="date"
              v-model="eventDay"
              class="my-input-large"
              required
            />
          </div>
          <div class="form-container-large-row">
            <label>Time</label>
            <input
              type="time"
              v-model="eventTime"
              class="my-input-large"
              required
            />
          </div>
          <div class="form-container-large-row">
            <label>Venue</label>
            <select v-model="venueId" class="my-input-large" required>
              <option disabled value="">Select a venue</option>
              <option
                v-for="venue in venues"
                :key="venue.venue_id"
                :value="venue.venue_id"
              >
                {{ venue.venue_name }}
              </option>
            </select>
          </div>
          <div class="form-container-large-row">
            <label>Tournament</label>
            <select v-model="tournamentId" class="my-input-large">
              <option value="">No tournament</option>
              <option
                v-for="tournament in tournaments"
                :key="tournament.tournament_id"
                :value="tournament.tournament_id"
              >
                {{ tournament.tournament_name }}
              </option>
            </select>
          </div>
          <div class="form-container-large-row">
            <label>Sport</label>
            <select v-model="sportId" class="my-input-large" required>
              <option disabled value="">Select a sport</option>
              <option
                v-for="sport in sports"
                :key="sport.sport_id"
                :value="sport.sport_id"
              >
                {{ sport.sport_name }}
              </option>
            </select>
          </div>

          <button type="submit" class="my-input-submit-large">Submit</button>
        </form>
      </div>
    </section>
  </section>
</template>
