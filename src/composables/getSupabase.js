import { supabase } from "@/lib/subabaseClient";

export async function getEvents(filters = {}) {
  let query = supabase.from("events").select(`
      id,
      played,
      event_day,
      event_time,
      venue ( name ),
      sport ( name ),
      home_team ( team_name ),
      away_team ( team_name )
    `);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      query = query.eq(key, value);
  });

  const { data, error } = await query;
  if (error) console.error("Error fetching events: ", error.message);
  return data ?? [];
}

export async function getSports(filters = {}) {
  let query = supabase.from("sports").select();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      query = query.eq(key, value);
  });

  const { data, error } = await query;
  if (error) console.error("Error fetching sports:", error.message);
  return data ?? [];
}

export async function getTeams(filters = {}) {
  let query = supabase.from("teams").select();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "")
      query = query.eq(key, value);
  });

  const { data, error } = await query;
  if (error) console.error("Error fetching teams:", error.message);
  return data ?? [];
}
