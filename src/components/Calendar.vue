<script setup>
import { offsetArray } from "@/utils/arrayHelpers";
import { DAYS, MONTHS } from "@/utils/calendar";
import { getDateArray } from "@/utils/dateHelpers";
import { computed, ref } from "vue";

const startMonday = ref(true);

const date = ref(new Date());

const formattedDate = computed(() => {
  const d = date.value;
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
});

const allDates = computed(() => {
  return getDateArray(
    date.value.getFullYear(),
    date.value.getMonth(),
    startMonday.value
  );
});

const isExpandedRows = computed(() => {
  if (
    allDates.value.length > 35 &&
    allDates.value[allDates.value.length - 7].getDate() > 20
  )
    return true;

  return false;
});

const displayedDates = computed(() => {
  return !isExpandedRows.value ? allDates.value.slice(0, -7) : allDates.value;
});

const days = computed(() => (startMonday.value ? offsetArray(DAYS) : DAYS));

const upMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() + 1);
};
const downMonth = () => {
  date.value = new Date(date.value.getFullYear(), date.value.getMonth() - 1);
};
const flipStart = () => (startMonday.value = !startMonday.value);

const onDateChange = (e) => {
  const [year, month, day] = e.target.value.split("-");
  date.value = new Date(year, month - 1, day);
};

const logDay = (date) => {
  console.log(date.to);
};
</script>

<template>
  <div class="combined-calendar-grid">
    <section class="calendar-side-bar">
      <div class="border-b border-(--grey) flex justify-between px-1">
        <div>{{ MONTHS[date.getMonth()] }}</div>
        <div>{{ date.getDate() }}</div>
        <div>{{ date.getFullYear() }}</div>
      </div>
      <input type="date" :value="formattedDate" @input="onDateChange" />
      <div class="button-container">
        <button @click="flipStart" class="simple-button">flip</button>
        <button @click="upMonth" class="simple-button">up</button>
        <button @click="downMonth" class="simple-button">down</button>
      </div>
    </section>
    <section class="flex justify-center">
      <div
        class="calendar-grid"
        :style="{
          gridTemplateRows: isExpandedRows
            ? '2rem repeat(6, 5fr)'
            : '2rem repeat(5, 5fr)',
        }"
      >
        <div class="calendar-day" v-for="day in days">
          <span class="full">{{ day }}</span>
          <span class="abbr">{{ day.slice(0, 3) }}</span>
        </div>
        <div
          v-for="(date, index) in displayedDates"
          :key="index"
          class="calendar-cell"
          @click="logDay(date)"
        >
          {{ date.getDate() }}
        </div>
      </div>
    </section>
  </div>
</template>
