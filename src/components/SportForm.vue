<script setup>
import { useSports } from "@/composables/useSports";
import { computed, ref } from "vue";

const { updateSports, deleteSports, addSports, sports } = useSports();

const sportName = ref("");
const editedName = ref("");
const editingId = ref(null);
const newSportForm = ref(false);

const sortedSports = computed(() => {
  return [...sports.value].sort((a, b) => a.sport_id - b.sport_id);
});

const onSubmit = async () => {
  if (!sportName.value.trim()) return;
  const newSport = { sport_name: sportName.value.toLowerCase() };
  const result = await addSports(newSport);

  if (!result.success) {
    alert(`Failed to add: ${result.error.message}`);
    return;
  }

  sportName.value = "";
  newSportForm.value = false;
};

const startEditing = (sport) => {
  editingId.value = sport.sport_id;
  editedName.value = sport.sport_name;
};

const cancelEdit = () => {
  editingId.value = null;
};

const saveEdit = async (id) => {
  if (!editedName.value.trim()) return;
  const result = await updateSports(id, {
    sport_name: editedName.value.toLowerCase(),
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
    <h1>Sports</h1>
    <!-- Existing Data -->
    <section class="items-table">
      <div
        v-for="sport in sortedSports"
        :key="sport.sport_id"
        class="items-row"
      >
        <!-- View Editing -->
        <template v-if="editingId === sport.sport_id">
          <!-- Update Form -->
          <input
            type="text"
            v-model="editedName"
            class="form-input edit-row"
            title
          />
          <!-- Form Button -->
          <div class="form-btn-container">
            <button @click="saveEdit(sport.sport_id)" class="form-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M480 128c0 8.188-3.125 16.38-9.375 22.62l-256 256C208.4 412.9 200.2 416 192 416s-16.38-3.125-22.62-9.375l-128-128C35.13 272.4 32 264.2 32 256c0-18.28 14.95-32 32-32 8.188 0 16.38 3.125 22.62 9.375L192 338.8l233.4-233.4c6.2-6.27 14.4-9.4 22.6-9.4 17.1 0 32 13.7 32 32z"
                />
              </svg>
            </button>
            <button @click="cancelEdit" class="form-btn">
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
        </template>
        <!-- View Not Editing -->
        <template v-else>
          <h3 class="data-container">{{ sport.sport_name }}</h3>
          <!-- Buttons -->
          <div class="form-btn-container">
            <button @click="startEditing(sport)" class="form-btn">
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
            <button @click="deleteSports(sport.sport_id)" class="form-btn">
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
          </div>
        </template>
      </div>
    </section>
    <!-- Add New Form -->
    <section class="add-btn-container">
      <div
        class="input-container"
        :class="
          newSportForm ? 'input-container-show' : 'input-container-hidden'
        "
      >
        <form class="form-container" @submit.prevent="onSubmit">
          <label><span class="text-nowrap">Sport Name</span></label>
          <input
            type="text"
            required
            v-model="sportName"
            class="my-input"
            placeholder="Sport name here"
            title
          />
          <button type="submit" class="my-input-submit">Submit</button>
        </form>
      </div>
      <div
        class="plus-btn-container"
        @click="newSportForm = !newSportForm"
        :class="[newSportForm ? 'plus-btn-show' : 'plus-btn-hidden']"
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
    </section>
  </section>
</template>
