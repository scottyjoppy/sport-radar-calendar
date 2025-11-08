import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const teams = ref([]);

export function useTeams() {
  const loadTeams = async () => {
    const { data, error } = await supabase.from("teams").select("*");
    if (error) {
      console.error("Error loading teams:", error);
      return;
    }
    teams.value = data;
  };

  const addTeams = async (newTeam) => {
    const { data, error } = await supabase
      .from("teams")
      .insert([newTeam])
      .select();
    if (error) {
      console.error("Insert failed:", error);
      return { success: false, error };
    }
    teams.value.push(data[0]);
    return { success: true, data: data[0] };
  };

  const updateTeams = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("teams")
      .update(updatedFields)
      .eq("team_id", id)
      .select();
    if (error) {
      console.error("Update failed:", error);
      return { success: false, error };
    }
    if (data && data.length) {
      teams.value = teams.value.filter((e) => e.team_id !== id).concat(data[0]);
    }
    return { success: true, data: data[0] };
  };

  const deleteTeams = async (id) => {
    const { error } = await supabase.from("teams").delete().eq("team_id", id);
    if (error) {
      console.error("Delete failed:", error);
      return;
    }
    teams.value = teams.value.filter((e) => e.team_id !== id);
  };

  onMounted(() => {
    loadTeams();
  });

  return { teams, updateTeams, deleteTeams, addTeams, loadTeams };
}
