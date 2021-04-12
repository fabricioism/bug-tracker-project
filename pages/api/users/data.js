import { supabase } from "@lib/initSupabase";

// Example of how to verify and get user data server-side.
const data = async (req, res) => {
  const token = req.headers.token;
  const { data, error } = await supabase.auth.api.getUser(token);

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data?.id);

  if (userError) return res.status(401).json({ error: userError.message });
  return res.status(200).json(userData);
};

export default data;
