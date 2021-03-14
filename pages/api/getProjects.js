import { supabase } from "@lib/initSupabase";

// Example of how to verify and get user data server-side.
const getProjects = async (req, res) => {
  const { data: projects, error } = await supabase
    .from("project")
    .select("*")
    .order("id", { ascending: true });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ projects });
};

export default getProjects;
