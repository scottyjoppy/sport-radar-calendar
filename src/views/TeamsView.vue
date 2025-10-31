<script setup>
import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const teams = ref([]);

async function getTeams() {
  const { data } = await supabase.from("teams").select();
  teams.value = data;
}

onMounted(() => {
  getTeams();
});
</script>

<template>
  <h1 class="text-xl font-bold underline">Teams Page</h1>
  <ul>
    <li v-for="team in teams" :key="team.id">
      <span>{{ team.team_name }}---</span>
      <span>{{ team.official_name }}---</span>
      <span>{{ team.abbreviation }}---</span>
      <span>{{ team.slug }}</span>
    </li>
  </ul>
</template>
