import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const venues = ref([]);

export function useVenues() {
  const loadVenues = async () => {
    const { data, error } = await supabase.from("venues").select("*");
    if (error) {
      console.error("Error loading venues:", error);
      return;
    }
    venues.value = data;
  };

  const addVenues = async (newVenue) => {
    const { data, error } = await supabase
      .from("venues")
      .insert([newVenue])
      .select();
    if (error) {
      console.error("Insert failed:", error);
      return;
    }
    venues.value.push(data[0]);
  };

  const updateVenues = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("venues")
      .update(updatedFields)
      .eq("venue_id", id)
      .select();
    if (error) {
      console.error("Update failed:", error);
      return;
    }
    if (data && data.length) {
      venues.value = venues.value
        .filter((e) => e.venue_id !== id)
        .concat(data[0]);
    }
  };

  const deleteVenues = async (id) => {
    const { error } = await supabase.from("venues").delete().eq("venue_id", id);
    if (error) {
      console.error("Delete failed:", error);
      return;
    }
    venues.value = venues.value.filter((e) => e.venue_id !== id);
  };

  onMounted(() => {
    loadVenues();
  });

  return { venues, updateVenues, deleteVenues, addVenues, loadVenues };
}
