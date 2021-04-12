import { supabase } from "@lib/initSupabase";

// Get Bugs
const bugs = async (req, res) => {
  const { data: bugs, error } = await supabase
    .from("bug")
    .select(`*, project(id, name), users(id, name, email)`);
  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(bugs);
};

export default bugs;
