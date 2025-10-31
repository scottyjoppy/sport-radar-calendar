<script setup>
import Navbar from "@/components/Navbar.vue";
import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";

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
  <Navbar></Navbar>
  <RouterView />
</template>
