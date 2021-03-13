import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@lib/initSupabase";

const PublicRoute = ({ children, location }) => {
  const user = supabase.auth.user();
  const router = useRouter();
  const [viewApproved, setviewApproved] = useState(false);

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setviewApproved(true);
    }
  }, [location]);
  return viewApproved ? children : null;
};

export { PublicRoute };
