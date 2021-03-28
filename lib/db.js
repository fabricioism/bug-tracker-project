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
