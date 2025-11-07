import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const events = ref([]);

export function useEvents() {
  const loadEvents = async () => {
    const { data, error } = await supabase.from("events").select("*");
    if (error) {
      console.error("Error loading events:", error);
      return;
    }
    events.value = data;
  };

  const addEvents = async (newEvent) => {
    const { data, error } = await supabase
      .from("events")
      .insert([newEvent])
      .select();
    if (error) {
      console.error("Insert failed:", error);
      return;
    }
    events.value.push(data[0]);
  };

  const updateEvents = async (id, updatedFields) => {
    const { data, error } = await supabase
      .from("events")
      .update(updatedFields)
      .eq("event_id", id)
      .select();
    if (error) {
      console.error("Update failed:", error);
      return;
    }
    if (data && data.length) {
      events.value = events.value
        .filter((e) => e.event_id !== id)
        .concat(data[0]);
    }
  };

  const deleteEvents = async (id) => {
    const { error } = await supabase.from("events").delete().eq("event_id", id);
    if (error) {
      console.error("Delete failed:", error);
      return;
    }
    events.value = events.value.filter((e) => e.event_id !== id);
  };

  onMounted(() => {
    loadEvents();
  });

  return { events, updateEvents, deleteEvents, addEvents, loadEvents };
}
