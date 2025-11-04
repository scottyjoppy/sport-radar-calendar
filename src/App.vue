<script setup>
import Navbar from "@/components/Navbar.vue";
import { useEvents } from "@/composables/useEvents";
import { RouterView } from "vue-router";

// Initialize events on page mount
const { events } = useEvents();
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>
