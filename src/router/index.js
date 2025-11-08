import { createMemoryHistory, createRouter } from "vue-router";

import CalendarView from "@/views/CalendarView.vue";
import EventsView from "@/views/EventsView.vue";
import SportsView from "@/views/SportsView.vue";
import TeamsView from "@/views/TeamsView.vue";
import TournamentsView from "@/views/TournamentsView.vue";
import VenuesView from "@/views/VenuesView.vue";

const routes = [
  { path: "/", component: CalendarView },
  { path: "/events", component: EventsView },
  { path: "/sports", component: SportsView },
  { path: "/teams", component: TeamsView },
  { path: "/tournaments", component: TournamentsView },
  { path: "/venues", component: VenuesView },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
