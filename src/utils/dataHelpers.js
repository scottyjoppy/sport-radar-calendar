import { useSports } from "@/composables/useSports";
import { useTeams } from "@/composables/useTeams";
import { useTournaments } from "@/composables/useTournaments";
import { useVenues } from "@/composables/useVenues";

const { sports } = useSports();
const { teams } = useTeams();
const { venues } = useVenues();
const { tournaments } = useTournaments();

export function getSportName(id) {
  return sports.value.find((i) => i.sport_id === id)?.sport_name || "";
}

export function getTeamName(id) {
  return teams.value.find((i) => i.team_id === id)?.team_name || "";
}

export function getTeamAbbr(id) {
  return teams.value.find((i) => i.team_id === id)?.abbreviation || "";
}

export function getTournamentName(id) {
  return (
    tournaments.value.find((i) => i.tournament_id === id)?.tournament_name || ""
  );
}

export function getVenueName(id) {
  return venues.value.find((i) => i.venue_id === id)?.venue_name || "";
}
