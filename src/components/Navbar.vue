<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav
    class="flex justify-between items-center uppercase text-(--off-white) font-bold bg-(--primary) h-20 p-3"
  >
    <RouterLink class="w-full h-full" to="/">
      <img
        src="https://sportradar.com/wp-content/uploads/2023/11/Sportradar-Brand-Line_Color_White.svg"
        alt=""
        class="h-full"
      />
    </RouterLink>
    <div class="flex gap-3">
      <RouterLink class="nav-link" to="/calendar">Calendar</RouterLink>
      <RouterLink class="nav-link" to="/teams">Teams</RouterLink>
      <RouterLink class="nav-link" to="/events">Events</RouterLink>
      <RouterLink class="nav-link" to="/sports">Sports</RouterLink>
    </div>
  </nav>
</template>
