import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout";
import { Auth } from "@supabase/ui";
import { supabase } from "@lib/initSupabase";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Auth.UserContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
