import { supabase } from "@lib/initSupabase";

// Get Developers
const developers = async (req, res) => {
  const { data: developers, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", 1);

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(developers);
};

export default developers;
