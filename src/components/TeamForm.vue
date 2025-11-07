<script setup>
import { useTeams } from "@/composables/useTeams";
import { computed, ref } from "vue";

const { updateTeams, deleteTeams, addTeams, teams } = useTeams();

const teamName = ref("");
const officialName = ref("");
const countryCode = ref("");
const abbreviation = ref("");

const editingId = ref(null);
const newTeamForm = ref(false);
const expandTeamsId = ref(null);

const editedTeam = ref({
  official_name: "",
  team_name: "",
  country_code: "",
  abbreviation: "",
});

const sortedTeams = computed(() => {
  return [...teams.value].sort((a, b) => a.team_id - b.team_id);
});

const onSubmit = async () => {
  if (
    !teamName.value.trim() ||
    !officialName.value.trim() ||
    !countryCode.value ||
    !abbreviation.value
  )
    return;

  const newTeam = {
    team_name: teamName.value.toLowerCase(),
    official_name: officialName.value,
    country_code: countryCode.value.toUpperCase(),
    abbreviation: abbreviation.value.toUpperCase(),
  };

  await addTeams(newTeam);

  teamName.value = "";
  officialName.value = "";
  countryCode.value = "";
  abbreviation.value = "";
  newTeamForm.value = false;
};

const expandTeams = (team) => {
  expandTeamsId.value =
    expandTeamsId.value === team.team_id ? null : team.team_id;
};

const cancelEdit = () => {
  editingId.value = null;
};

const startEditing = (team) => {
  editingId.value = team.team_id;
  editedTeam.value = { ...team };
};

const saveEdit = async (id) => {
  if (!editedTeam.value.team_name.trim()) return;
  await updateTeams(id, {
    team_name: editedTeam.value.team_name.toLowerCase(),
    official_name: editedTeam.value.official_name,
    country_code: editedTeam.value.country_code.toUpperCase(),
    abbreviation: editedTeam.value.abbreviation.toUpperCase(),
  });
  editingId.value = null;
};
</script>

<style scoped src="/src/assets/form.css"></style>

<template>
  <section class="form-section-container">
    <h1>Teams</h1>
    <section class="items-table">
      <div v-for="team in sortedTeams" :key="team.team_id" class="items-row">
        <template v-if="editingId === team.team_id">
          <form
            class="edit-form-container"
            @submit.prevent="saveEdit(team.team_id)"
          >
            <div class="edit-form">
              <div class="edit-form-row">
                <label class="underline">Official Name</label>
                <input
                  v-model="editedTeam.official_name"
                  placeholder="Official Name"
                  class="form-input"
                  required
                />
              </div>
              <div class="edit-form-row">
                <label class="underline">Team Name</label>
                <input
                  v-model="editedTeam.team_name"
                  placeholder="Team Name"
                  class="form-input"
                  required
                />
              </div>
              <div class="edit-form-row">
                <label class="underline">Country Code</label>
                <input
                  v-model="editedTeam.country_code"
                  placeholder="Country Code"
                  maxlength="3"
                  class="form-input"
                  required
                />
              </div>
              <div class="edit-form-row">
                <label class="underline">Abbreviation</label>
                <input
                  v-model="editedTeam.abbreviation"
                  placeholder="Abbreviation"
                  maxlength="3"
                  class="form-input"
                  required
                />
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
        <template v-else>
          <div class="data-container">
            <template v-if="expandTeamsId === team.team_id">
              <h3>
                <span class="h3-title">Official Name:</span
                ><span class="underline">{{ team.official_name }}</span>
              </h3>
              <h3>
                <span class="h3-title">Team Name:</span
                ><span class="italic">{{ team.team_name }}</span>
              </h3>
              <h3>
                <span class="h3-title">Abbreviation:</span
                ><span>{{ team.abbreviation }}</span>
              </h3>
              <h3>
                <span class="h3-title">Country code:</span>
                <span class="font-bold">{{ team.country_code }}</span>
              </h3>
            </template>
            <template v-else>
              <h3>{{ team.team_name }}</h3>
            </template>
          </div>
          <div class="form-btn-container">
            <button
              @click="expandTeams(team)"
              :class="
                expandTeamsId === team.team_id ? 'form-btn-expand' : 'form-btn'
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                :class="expandTeamsId === team.team_id ? 'rotate-180' : ''"
              >
                <path d="M33.17 17.17 24 26.34l-9.17-9.17L12 20l12 12 12-12z" />
                <path d="M0 0h48v48H0z" fill="none" />
              </svg>
            </button>
            <button
              @click="startEditing(team)"
              :class="
                expandTeamsId === team.team_id ? 'form-btn-expand' : 'form-btn'
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
            <template v-if="expandTeamsId !== team.team_id">
              <button @click="deleteTeams(team.team_id)" class="form-btn">
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
    <section class="add-btn-container-large">
      <div
        class="plus-btn-container-large"
        @click="newTeamForm = !newTeamForm"
        :class="[newTeamForm ? 'plus-btn-large-show' : 'plus-btn-large-hidden']"
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
          newTeamForm
            ? 'input-container-large-show'
            : 'input-container-large-hidden'
        "
      >
        <form class="form-container-large" @submit.prevent="onSubmit">
          <div class="form-container-large-row">
            <label>Official Name</label>
            <input
              type="text"
              v-model="officialName"
              class="my-input-large"
              required
            />
          </div>

          <div class="form-container-large-row">
            <label>Team Name</label>
            <input
              type="text"
              v-model="teamName"
              class="my-input-large"
              required
            />
          </div>

          <div class="form-container-large-row">
            <label>Country Code</label>
            <input
              type="text"
              v-model="countryCode"
              class="my-input-large"
              maxlength="3"
              required
            />
          </div>
          <div class="form-container-large-row">
            <label>Abbreviation</label>
            <input
              type="text"
              v-model="abbreviation"
              class="my-input-large"
              required
              maxlength="3"
            />
          </div>
          <button type="submit" class="my-input-submit-large">Submit</button>
        </form>
      </div>
    </section>
  </section>
</template>
