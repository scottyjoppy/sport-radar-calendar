<script setup>
import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const sports = ref([]);

async function getInstruments() {
  const { data } = await supabase.from("sports").select();
  sports.value = data;
}

onMounted(() => {
  getInstruments();
});
</script>

<template>
  <ul>
    <li class="hover:font-bold hover:cursor-default highlight-red" v-for="sport in sports" :key="sport.id">
      {{ sport.name }}
    </li>
  </ul>
</template>
