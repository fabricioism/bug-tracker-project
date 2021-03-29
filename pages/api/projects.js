import { supabase } from "@lib/initSupabase";

// Get Developers
const projects = async (req, res) => {
  /** Role = 3 means a Developer */
  const { data: projects, error } = await supabase.from("project").select("*");

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(projects);
};

export default projects;
