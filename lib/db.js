import { supabase } from "@lib/initSupabase";

export const UpdateUser = async (id, newValues) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      active: newValues?.active,
      name: newValues?.name,
      programingLanguages: newValues?.languages,
      technologies: newValues?.technologies,
    })
    .eq("id", id);
  return { data, error };
};

export const UpdateBug = async (id, newValues) => {
  const { data, error } = await supabase
    .from("bug")
    .update({
      bugstate: parseInt(newValues?.bugstate),
      description: newValues?.description,
      name: newValues?.name,
      priority: parseInt(newValues?.priority),
    })
    .eq("id", id);
  return { data, error };
};

export const UpdateBugAsDone = async (id) => {
  const { data, error } = await supabase
    .from("bug")
    .update({
      bugstate: 5,
      endDate: new Date(),
    })
    .eq("id", id);
  return { data, error };
};
