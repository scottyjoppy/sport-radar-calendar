<script setup>
import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const sports = ref([]);

async function getSports() {
  const { data } = await supabase.from("sports").select();
  sports.value = data;
}

onMounted(() => {
  getSports();
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
