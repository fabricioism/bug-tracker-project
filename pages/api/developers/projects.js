import { supabase } from "@lib/initSupabase";

// Get Developers
const projects = async (req, res) => {
  const token = req.headers.token;
  /** Role = 3 means a Developer */
  const { data, error } = await supabase
    .from("projectxdeveloper")
    .select(`project(*)`)
    .eq("developer", token);

  let projects = data?.map((item) => item.project);

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(projects);
};

export default projects;
