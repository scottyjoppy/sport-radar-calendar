<script setup>
import { useSports } from "@/composables/useSports";
import { useTournaments } from "@/composables/useTournaments";
import { getSportName } from "@/utils/dataHelpers";
import { computed, ref } from "vue";

const { updateTournaments, deleteTournaments, addTournaments, tournaments } =
  useTournaments();
const { sports } = useSports();

const tournamentName = ref("");
const tournamentYear = ref("");
const sportId = ref("");

const editingId = ref(null);
const newTournamentForm = ref(false);
const expandTournamentsId = ref(null);

const editedTournament = ref({
  tournament_name: "",
  tournament_year: "",
  sport_id: "",
});

const yearRange = computed(() => {
  const currentYear = new Date().getFullYear();
  const range = [];
  for (let i = currentYear; i >= currentYear - 50; i--) {
    range.push(i);
  }
  return range;
});

const sortedTournaments = computed(() => {
  return [...tournaments.value].sort(
    (a, b) => a.tournament_id - b.tournament_id
  );
});

const onSubmit = async () => {
  if (!tournamentName.value.trim() || !sportId.value || !tournamentYear.value)
    return;

  const newTournament = {
    tournament_name: tournamentName.value,
    tournament_year: tournamentYear.value,
    sport_id: sportId.value,
  };

  const result = await addTournaments(newTournament);

  if (!result.success) {
    alert(`Failed to add: ${result.error.message}`);
    return;
  }

  tournamentName.value = "";
  tournamentYear.value = "";
  sportId.value = "";
  newTournamentForm.value = false;
};

const expandTournaments = (tournament) => {
  expandTournamentsId.value =
    expandTournamentsId.value === tournament.tournament_id
      ? null
      : tournament.tournament_id;
};

const cancelEdit = () => {
  editingId.value = null;
};

const removeItem = async (id) => {
  const result = await deleteTournaments(id);

  if (!result.success) {
    alert(`Failed to delete: ${result.error.message}`);
    return;
  }
};

const startEditing = (tournament) => {
  editingId.value = tournament.tournament_id;
  editedTournament.value = { ...tournament };
};

const saveEdit = async (id) => {
  if (!editedTournament.value.tournament_name.trim()) return;
  const result = await updateTournaments(id, {
    tournament_name: editedTournament.value.tournament_name,
    tournament_year: editedTournament.value.tournament_year,
    sport_id: editedTournament.value.sport_id,
  });

  if (!result.success) {
    alert(`Failed to update: ${result.error.message}`);
    return;
  }

  editingId.value = null;
};
</script>

<style scoped src="/src/assets/form.css"></style>

<template>
  <!-- Full Form -->
  <section class="form-section-container">
    <h1>Tournaments</h1>
    <!-- Existing Data -->
    <section class="items-table">
      <div
        v-for="tournament in sortedTournaments"
        :key="tournament.tournament_id"
        class="items-row"
      >
        <!-- View Editing -->
        <template v-if="editingId === tournament.tournament_id">
          <!-- Update Form -->
          <form
            class="edit-form-container"
            @submit.prevent="saveEdit(tournament.tournament_id)"
          >
            <div class="edit-form">
              <div class="edit-form-row">
                <label class="underline">Tournament Name</label>
                <input
                  v-model="editedTournament.tournament_name"
                  placeholder="Tournament Name"
                  class="form-input"
                  required
                />
              </div>
              <div class="edit-form-row">
                <label class="underline">Year</label>
                <select
                  v-model="editedTournament.tournament_year"
                  class="form-input"
                  required
                >
                  <option v-for="y in yearRange" :key="y" :value="y">
                    {{ y }}
                  </option>
                </select>
              </div>
              <div class="edit-form-row">
                <label class="underline">Sport</label>
                <select v-model="editedTournament.sport_id" class="form-input">
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
            <template v-if="expandTournamentsId === tournament.tournament_id">
              <h3 class="tournament-title">
                <span class="h3-title">Tournament Name:</span
                ><span class="italic">{{ tournament.tournament_name }}</span>
              </h3>
              <h3>
                <span class="h3-title">Year:</span
                ><span>{{ tournament.tournament_year }}</span>
              </h3>
              <h3>
                <span class="h3-title">Sport:</span>
                <span class="font-bold">{{
                  getSportName(tournament.sport_id)
                }}</span>
              </h3>
            </template>
            <!-- View Not Expanded -->
            <template v-else>
              <h3>{{ tournament.tournament_name }}</h3>
            </template>
          </div>
          <!-- Buttons -->
          <div class="form-btn-container">
            <button
              @click="expandTournaments(tournament)"
              :class="
                expandTournamentsId === tournament.tournament_id
                  ? 'form-btn-expand'
                  : 'form-btn'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                :class="
                  expandTournamentsId === tournament.tournament_id
                    ? 'rotate-180'
                    : ''
                "
              >
                <path d="M33.17 17.17 24 26.34l-9.17-9.17L12 20l12 12 12-12z" />
                <path d="M0 0h48v48H0z" fill="none" />
              </svg>
            </button>
            <button
              @click="startEditing(tournament)"
              :class="
                expandTournamentsId === tournament.tournament_id
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
            <template v-if="expandTournamentsId !== tournament.tournament_id">
              <button
                @click="removeItem(tournament.tournament_id)"
                class="form-btn"
              >
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
        @click="newTournamentForm = !newTournamentForm"
        :class="[
          newTournamentForm ? 'plus-btn-large-show' : 'plus-btn-large-hidden',
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
          newTournamentForm
            ? 'input-container-large-show'
            : 'input-container-large-hidden'
        "
      >
        <form class="form-container-large" @submit.prevent="onSubmit">
          <div class="form-container-large-row">
            <label>Tournament Name</label>
            <input
              type="text"
              v-model="tournamentName"
              class="my-input-large"
              placeholder="Tournament Name"
              required
            />
          </div>
          <div class="form-container-large-row">
            <label>Year</label>
            <select v-model="tournamentYear" class="my-input-large" required>
              <option disabled value="">yyyy</option>
              <option v-for="y in yearRange" :key="y" :value="y">
                {{ y }}
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
