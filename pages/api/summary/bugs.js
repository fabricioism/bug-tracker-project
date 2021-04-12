import { supabase } from "@lib/initSupabase";
import { bugStates } from "@/constants/states";

// Get Bugs
const bugs = async (req, res) => {
  const { data: bugs, error } = await supabase
    .from("bug")
    .select(`id, bugstate(id, name)`);

  let summaryBugs = [];

  Object.keys(bugStates).forEach((type) => {
    let count = bugs.filter((bug) => bug.bugstate.id == type).length;
    summaryBugs = [...summaryBugs, { label: bugStates[type].label, count }];
  });

  if (error) return res.status(401).json({ error: error.message });

  return res.status(200).json(summaryBugs);
};

export default bugs;
