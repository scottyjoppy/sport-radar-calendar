<script setup>
import { MONTHS } from "@/utils/calendar";
import { getDayArray } from "@/utils/dateHelpers";
import { computed, ref } from "vue";

const date = ref(new Date());
const days = computed(() => {
  return getDayArray(date.value.getFullYear(), date.value.getMonth(), 1);
});

const upMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1);
};
const downMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1);
};
</script>

<template>
  <section class="flex justify-center">
    <div>{{ MONTHS[date.getMonth()] }}</div>
    <div>{{ date.getFullYear() }}</div>
    <button @click="upMonth">Up</button>
    <button @click="downMonth">down</button>
    <div class="calendar-grid w-3/4">
      <div class="calendar-day">
        <span class="full">Monday</span>
        <span class="abbr">Mon</span>
      </div>
      <div class="calendar-day">
        <span class="full">Tuesday</span>
        <span class="abbr">Tues</span>
      </div>
      <div class="calendar-day">
        <span class="full">Wednesday</span>
        <span class="abbr">Wed</span>
      </div>
      <div class="calendar-day">
        <span class="full">Thursday</span>
        <span class="abbr">Thur</span>
      </div>
      <div class="calendar-day">
        <span class="full">Friday</span>
        <span class="abbr">Fri</span>
      </div>
      <div class="calendar-day">
        <span class="full">Saturday</span>
        <span class="abbr">Sat</span>
      </div>
      <div class="calendar-day">
        <span class="full">Sunday</span>
        <span class="abbr">Sun</span>
      </div>
      <div v-for="day in days" class="calendar-cell">{{ day }}</div>
    </div>
  </section>
</template>
