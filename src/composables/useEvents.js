import { supabase } from "@/lib/subabaseClient";
import { onMounted, ref } from "vue";

const events = ref([]);

export function useEvents() {
  const loadEvents = async () => {
    const { data } = await supabase.from("events").select("*");
    events.value = data;
  };

  onMounted(() => {
    loadEvents();
  });

  const updateEvent = async (id, updatedFields) => {
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
      events.value = events.value.filter((e) => e.id !== id).concat(data[0]);
    }
  };

  const deleteEvent = async (id) => {
    const { error } = await supabase.from("events").delete().eq("event_id", id);
    if (!error) {
      events.value = events.value.filter((e) => e.id !== id);
    }
  };

  const addEvent = async (newEvent) => {
    const { data, error } = await supabase
      .from("events")
      .insert([newEvent])
      .select();
    if (!error) events.value.push(data[0]);
  };

  return { events, updateEvent, deleteEvent, addEvent };
}
