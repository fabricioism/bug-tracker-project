import { Footer, Navbar } from "@/components/molecules/index";
import { Spinner } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { supabase } from "@lib/initSupabase";

const Layout = ({ children }) => {
  const user = supabase.auth.user();
  const { session } = Auth.useUser();
  const { data, error } = useSWR(
    session ? ["/api/users/data", session.access_token] : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <Spinner />;

  return user ? (
    <>
      <Navbar role={data[0]?.role} />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-10 mx-auto">{children}</div>
      </section>
      <Footer />
    </>
  ) : (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-10 mx-auto">{children}</div>
    </section>
  );
};

export { Layout };
