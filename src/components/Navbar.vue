<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const expandNav = ref(false);
const navContainer = ref(null);

const closeNav = () => {
  expandNav.value = false;
};

const handleKey = (e) => {
  if (e.key === "Escape") closeNav();
};

const handleClick = (e) => {
  if (
    expandNav.value &&
    navContainer.value &&
    !navContainer.value.contains(e.target)
  ) {
    closeNav();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleKey);
  document.addEventListener("click", handleClick);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKey);
  document.removeEventListener("click", handleClick);
});
</script>

<style scoped src="/src/assets/navbar.css"></style>

<template>
  <nav class="nav-container">
    <RouterLink class="nav-image" to="/">
      <img
        src="https://sportradar.com/wp-content/uploads/2023/11/Sportradar-Brand-Line_Color_White.svg"
        alt=""
        class="h-full"
      />
    </RouterLink>
    <div class="nav-btn" @click.stop="expandNav = !expandNav">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
        <path
          d="M50 12.5H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4ZM50 28H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4ZM50 43.5H2a2 2 0 0 1 0-4h48a2 2 0 0 1 0 4Z"
        />
      </svg>
    </div>
    <div class="nav-link-container" :class="{ 'expand-nav': expandNav }" ref="navContainer">
      <div class="exit-image" @click="closeNav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="svg-style rotate-45"
          viewBox="0 0 32 32"
        >
          <path
            d="M28 14H18V4a2 2 0 0 0-4 0v10H4a2 2 0 0 0 0 4h10v10a2 2 0 0 0 4 0V18h10a2 2 0 0 0 0-4z"
          />
        </svg>
      </div>
      <RouterLink class="nav-link" to="/">Calendar</RouterLink>
      <RouterLink class="nav-link" to="/events">Events</RouterLink>
      <RouterLink class="nav-link" to="/teams">Teams</RouterLink>
      <RouterLink class="nav-link" to="/tournaments">Tournaments</RouterLink>
      <RouterLink class="nav-link" to="/sports">Sports</RouterLink>
      <RouterLink class="nav-link" to="/venues">Venues</RouterLink>
    </div>
  </nav>
</template>
