<script setup>
import { getEvents } from "@/composables/getSupabase";
import { onMounted, ref, watch } from "vue";

const date = ref(new Date());
const openEventId = ref(null);
const events = ref([]);

const toggleDetails = (id) => {
  openEventId.value = openEventId.value === id ? null : id;
};

onMounted(async () => {
  events.value = await getEvents();
});

watch(date, async (newDate) => {
  events.value = await getEvents({
    event_day: newDate.toISOString(),
  });
});
</script>

<template>
  <h1 class="text-xl font-bold underline">Events Page</h1>
  <br />
  <ul>
    <li
      class="event-item"
      v-for="event in events"
      :key="event.id"
      @click="toggleDetails(event.id)"
    >
      <div class="event-item-title">
        <div>{{ new Date(event.event_day).toDateString() }}</div>
        <div class="italic capitalize">{{ event.sport.name }}</div>
      </div>
      <div v-show="openEventId === event.id">
        <div>{{ event.venue.name }}</div>
        <div>{{ event.event_time }}</div>
        <div class="flex gap-3 items-center justify-center col-span-2">
          <div>{{ event.home_team.team_name }}</div>
          <div>-VS-</div>
          <div>{{ event.away_team.team_name }}</div>
        </div>
      </div>
    </li>
  </ul>
</template>
