import { supabase } from "@lib/initSupabase";

// Example of how to verify and get user data server-side.
const getRoles = async (req, res) => {
  const { data: roles, error } = await supabase
    .from("rol")
    .select("id, name")
    .not("id", "eq", 1) // Not an admin (Admin is id = 1)
    .order("id", { ascending: true });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ roles });
};

export default getRoles;
