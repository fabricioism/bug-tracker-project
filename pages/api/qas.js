import { supabase } from "@lib/initSupabase";

// Get Developers
const qas = async (req, res) => {
  /** Role = 3 means a Developer */
  const { data: qas, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", 4);

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(qas);
};

export default qas;
