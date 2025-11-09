import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const sports = ref([]);

export function useSports() {
  const loadSports = async () => {
    const { data, error } = await supabase.from("sports").select("*");
    if (error) {
      console.error("Error loading sports:", error);
      return;
    }
    sports.value = data;
  };

  const addSports = async (newSport) => {
    const { data, error } = await supabase
      .from("sports")
      .insert([newSport])
      .select();
    if (error) {
      console.error("Insert failed:", error);
      return { success: false, error };
    }
    sports.value.push(data[0]);
    return { success: true, data: data[0] };
  };

  const updateSports = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("sports")
      .update(updatedFields)
      .eq("sport_id", id)
      .select();
    if (error) {
      console.error("Update failed:", error);
      return { success: false, error };
    }
    if (data && data.length) {
      sports.value = sports.value
        .filter((e) => e.sport_id !== id)
        .concat(data[0]);
    }
    return { success: true, data: data[0] };
  };

  const deleteSports = async (id) => {
    const { error } = await supabase.from("sports").delete().eq("sport_id", id);
    if (error) {
      console.error("Delete failed:", error);
      return { success: false, error };
    }
    sports.value = sports.value.filter((e) => e.sport_id !== id);
    return { success: true };
  };

  onMounted(() => {
    loadSports();
  });

  return { sports, updateSports, deleteSports, addSports, loadSports };
}
