import { supabase } from "@lib/initSupabase";

export const CreateBug = async (newValues) => {
  const { data, error } = await supabase.from("bug").insert([
    {
      bugstate: parseInt(newValues?.bugstate),
      description: newValues?.description,
      name: newValues?.name,
      priority: parseInt(newValues?.priority),
    },
  ]);
  return { data, error };
};

export const CreteProject = async (newValues) => {
  const { data, error } = await supabase.from("project").insert([
    {
      name: newValues?.name,
      startDate: newValues?.startDate,
      endDate: newValues?.endDate,
    },
  ]);
  return { data, error };
};

export const UpdateProject = async (id, newValues) => {
  const { data, error } = await supabase
    .from("project")
    .update([
      {
        name: newValues?.name,
        startDate: newValues?.startDate,
        endDate: newValues?.endDate,
      },
    ])
    .eq("id", id);
  return { data, error };
};

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
