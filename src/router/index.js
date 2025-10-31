import { createMemoryHistory, createRouter } from "vue-router";

import CalendarView from "@/views/CalendarView.vue";
import EventsView from "@/views/EventsView.vue";
import HomeView from "@/views/HomeView.vue";
import SportsView from "@/views/SportsView.vue";
import TeamsView from "@/views/TeamsView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/calendar", component: CalendarView },
  { path: "/teams", component: TeamsView },
  { path: "/sports", component: SportsView },
  { path: "/events", component: EventsView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
