import { supabase } from "@lib/initSupabase";

// Get Users
const users = async (req, res) => {
  const { data: users, error } = await supabase
    .from("users")
    .select(`*, roles(id, name)`);

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(users);
};

export default users;
