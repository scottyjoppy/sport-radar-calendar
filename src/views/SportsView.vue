<script setup>
import { getSports } from "@/composables/getSupabase";
import { onMounted, ref } from "vue";

const sports = ref([]);

onMounted(async () => {
  sports.value = await getSports();
});
</script>

<template>
  <h1 class="text-xl font-bold underline">Sports Page</h1>
  <ul>
    <li v-for="sport in sports" :key="sport.id">
      {{ sport.name }}
    </li>
  </ul>
</template>
