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
  await addSports(newSport);

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
  await updateSports(id, { sport_name: editedName.value.toLowerCase() });
  editingId.value = null;
};
</script>

<template>
  <section class="flex flex-col justify-center gap-10">
    <section>
      <div v-for="sport in sortedSports">
        <div class="flex gap-2">
          <template v-if="editingId === sport.sport_id">
            <div class="flex justify-between w-full">
              <input type="text" v-model="editedName" />
              <div>
                <button @click="saveEdit(sport.sport_id)">Save</button>
                <button @click="cancelEdit">Cancel</button>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-between w-full">
              <div class="capitalize">{{ sport.sport_name }}</div>
              <div>
                <button @click="startEditing(sport)">Edit</button>
                <button @click="deleteSports(sport.sport_id)">Delete</button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
    <div class="flex justify-center items-center h-10 w-full">
      <div
        class="transition-all duration-500 overflow-hidden"
        :class="newSportForm ? 'w-1/2 rounded-l-full' : 'w-0 rounded-r-full'"
      >
        <form
          class="bg-(--primary-light) text-(--off-white) flex justify-between p-2 h-full"
          @submit.prevent="onSubmit"
        >
          <label><span class="text-nowrap">Sport Name</span></label>
          <input
            type="text"
            required
            v-model="sportName"
            class="bg-(--off-white) text-(--off-black)"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div
        class="h-full flex transition-all hover:cursor-pointer p-2 duration-500"
        @click="newSportForm = !newSportForm"
        :class="[
          newSportForm
            ? 'rounded-r-[50%] rounded-l-[0%] bg-(--primary-light) hover:bg-(--primary-dark) hover:*:fill-(--off-white) *:fill-(--secondary)'
            : 'rounded-[50%] bg-(--grey-light) hover:bg-(--grey) hover:*:fill-(--primary)',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="fill-(--grey) transition-all duration-500"
          viewBox="0 0 32 32"
        >
          <path
            d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
