<script setup>
import Navbar from "@/components/Navbar.vue";
import SquareButton from "@/components/SquareButton.vue";
import Calendar from "@/components/Calendar.vue";
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
  <Navbar></Navbar>
  <ul>
    <li v-for="sport in sports" :key="sport.id">
      {{ sport.name }}
    </li>
  </ul>
  <div class="w-full flex justify-center">
    <SquareButton>Find out more</SquareButton>
  </div>
  <Calendar></Calendar>
</template>
