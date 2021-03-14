import { supabase } from "@lib/initSupabase";

// Example of how to verify and get user data server-side.
const getDevelopers = async (req, res) => {
  const { data: developers, error } = await supabase
    .from("user")
    .select("*")
    .order("id", { ascending: true });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ developers });
};

export default getDevelopers;
