<script setup>
import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const events = ref([]);

async function getEvents() {
  const { data } = await supabase.from("events").select(`
      id,
      played,
      start_time,
      venue ( name ),
      sport ( name ),
      home_team ( team_name ),
      away_team ( team_name )
    `);
  events.value = data;
  console.log(events.value);
}

onMounted(() => {
  getEvents();
});
</script>

<template>
  <h1 class="text-xl font-bold underline">Events Page</h1>
  <ul>
    <li v-for="event in events" :key="event.id">
      <span>{{ event.played }}---</span>
      <span>{{ event.venue.name }}---</span>
      <span>{{ event.sport.name }}---</span>
      <span>{{ event.home_team.team_name }}---</span>
      <span>{{ event.away_team.team_name }}---</span>
      <span>{{ event.start_time }}</span>
    </li>
  </ul>
</template>
