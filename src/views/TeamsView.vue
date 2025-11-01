<script setup>
import { getTeams } from "@/composables/getSupabase";
import { onMounted, ref } from "vue";

const teams = ref([]);

onMounted(async () => {
  teams.value = await getTeams();
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
