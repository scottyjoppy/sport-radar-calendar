import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const tournaments = ref([]);

export function useTournaments() {
  const loadTournaments = async () => {
    const { data, error } = await supabase.from("tournaments").select("*");
    if (error) {
      console.error("Error loading tournaments:", error);
      return;
    }
    tournaments.value = data;
  };

  const addTournaments = async (newTournament) => {
    const { data, error } = await supabase
      .from("tournaments")
      .insert([newTournament])
      .select();
    if (error) {
      console.error("Insert failed:", error);
      return;
    }
    tournaments.value.push(data[0]);
  };

  const updateTournaments = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("tournaments")
      .update(updatedFields)
      .eq("tournament_id", id)
      .select();
    if (error) {
      console.error("Update failed:", error);
      return;
    }
    if (data && data.length) {
      tournaments.value = tournaments.value
        .filter((e) => e.tournament_id !== id)
        .concat(data[0]);
    }
  };

  const deleteTournaments = async (id) => {
    const { error } = await supabase
      .from("tournaments")
      .delete()
      .eq("tournament_id", id);
    if (error) {
      console.error("Delete failed:", error);
      return;
    }
    tournaments.value = tournaments.value.filter((e) => e.tournament_id !== id);
  };

  onMounted(() => {
    loadTournaments();
  });

  return {
    tournaments,
    updateTournaments,
    deleteTournaments,
    addTournaments,
    loadTournaments,
  };
}
