import Link from "next/link";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Auth, Card, Typography, Space, Button } from "@supabase/ui";
import { supabase } from "@lib/initSupabase";
import fetcher from "@utils/fetcher";
import { Logo } from "@/constants/logo";

const Login = () => {
  const { user, session } = Auth.useUser();
  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );
  const [authView, setAuthView] = useState("sign_in");

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
        if (event === "USER_UPDATED")
          setTimeout(() => setAuthView("sign_in"), 1000);
        // Send session to /api/auth route to set the auth cookie.
        // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
        fetch("/api/auth", {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          credentials: "same-origin",
          body: JSON.stringify({ event, session }),
        }).then((res) => res.json());
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  const View = () => {
    if (!user)
      return (
        <Space direction="vertical" size={1}>
          <div>
            <img
              src="https://app.supabase.io/img/supabase-dark.svg"
              width="96"
            />
            <Typography.Title level={3}>
              Welcome to Bug Tracker
            </Typography.Title>
          </div>
          <Auth
            supabaseClient={supabase}
            view={authView}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          />
        </Space>
      );

    return (
      <Space direction="vertical" size={6}>
        {authView === "update_password" && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <Link href="/">
              <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-10 h-10 text-white p-2 bg-green-500 rounded-full"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                  <span className="ml-3 text-xl">Bug Tracker</span>
                </>
              </a>
            </Link>
            <Typography.Text>{`Hey there!  :)`}</Typography.Text>
            <Typography.Text strong>Email: {user.email}</Typography.Text>
            <Link href="/">
              <a>
                <Button style={{ color: "white" }}>Go home</Button>
              </a>
            </Link>
            <Button type="outline" onClick={() => supabase.auth.signOut()}>
              Logout
            </Button>
            {error && (
              <Typography.Text danger>Failed to fetch user!</Typography.Text>
            )}
            {data && !error ? (
              <>
                {/* <Typography.Text type="success">
                  User data retrieved server-side (in API route):
                </Typography.Text> */}

                {/* <Typography.Text>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                </Typography.Text> */}
              </>
            ) : (
              <div>Loading...</div>
            )}
          </>
        )}
      </Space>
    );
  };

  return (
    <div style={{ maxWidth: "420px", margin: "80px auto" }}>
      <Card>
        <View />
      </Card>
    </div>
  );
};

export default Login;
