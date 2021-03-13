import { Footer, Navbar } from "@/components/molecules/index";
import { supabase } from "@lib/initSupabase";

const Layout = ({ children }) => {
  const user = supabase.auth.user();

  return user ? (
    <>
      <Navbar />
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
