import { supabase } from "@lib/initSupabase";

// Example of how to verify and get user data server-side.
const getOneDeveloper = async (req, res) => {
  const { data: developers, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", req.body.id)
    .order("id", { ascending: true });

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json({ developers });
};

export default getOneDeveloper;
