<script setup>
import Navbar from "@/components/Navbar.vue";
import { useEvents } from "@/composables/useEvents";
import { useSports } from "@/composables/useSports";
import { useTeams } from "@/composables/useTeams";
import { useTournaments } from "@/composables/useTournaments";
import { useVenues } from "@/composables/useVenues";
import { RouterView } from "vue-router";

// Initialize events on page mount
const { events } = useEvents();
const { tournaments } = useTournaments();
const { teams } = useTeams();
const { venues } = useVenues();
const { sports } = useSports();
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>
