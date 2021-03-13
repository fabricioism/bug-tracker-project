import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@lib/initSupabase";

const PrivateRoute = ({ children, location }) => {
  const user = supabase.auth.user();
  const router = useRouter();
  const [viewApproved, setViewApproved] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setViewApproved(true);
    }
  }, [location]);

  return viewApproved ? children : null;
};

export { PrivateRoute };
