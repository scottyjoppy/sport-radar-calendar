<script setup>
import Navbar from "@/components/Navbar.vue";
import { useEvents } from "@/composables/useEvents";
import { RouterView } from "vue-router";

const { events } = useEvents();
</script>

<template>
  <Navbar></Navbar>
  <RouterView />
</template>
