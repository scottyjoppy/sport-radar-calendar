<script setup>
import { useEvents } from "@/composables/useEvents";
import { useSports } from "@/composables/useSports";
import { useTeams } from "@/composables/useTeams";
import { useTournaments } from "@/composables/useTournaments";
import { useVenues } from "@/composables/useVenues";
import { ref } from "vue";

const { addEvents } = useEvents();
const { sports } = useSports();
const { teams } = useTeams();
const { venues } = useVenues();
const { tournaments } = useTournaments();

const newEventForm = ref(false);

const homeTeam = ref("");
const awayTeam = ref("");
const eventDay = ref("");
const eventTime = ref("");
const sportId = ref("");
const tournamentId = ref("");
const venueId = ref("");

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

  const result = await addEvents(newEvent);

  if (!result.success) {
    alert(`Failed to add event: ${result.error.message}`);
    return;
  }

  homeTeam.value = "";
  awayTeam.value = "";
  eventDay.value = "";
  eventTime.value = "";
  sportId.value = "";
  venueId.value = "";
  tournamentId.value = "";
  newEventForm.value = false;
};
</script>

<style scoped src="/src/assets/form.css"></style>

<template>
  <section class="add-btn-container-large">
    <div
      class="plus-btn-container-large"
      @click="newEventForm = !newEventForm"
      :class="[newEventForm ? 'plus-btn-large-show' : 'plus-btn-large-hidden']"
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
</template>
