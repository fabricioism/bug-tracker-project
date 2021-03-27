import Link from "next/link";
import { useRouter } from "next/router";
import { supabase } from "@lib/initSupabase";
import { Logo } from "@/constants/logo";

const Navbar = () => {
  const router = useRouter();
  const { pathname } = router;
  const user = supabase.auth.user();

  const AdminLinks = () => {
    return (
      <>
        <Link href="/bugs">
          <a className="mr-5 hover:text-gray-900">Bugs</a>
        </Link>

        <Link href="/developers">
          <a className="mr-5 hover:text-gray-900">Developers</a>
        </Link>

        <Link href="/projects">
          <a className="mr-5 hover:text-gray-900">Projects</a>
        </Link>
      </>
    );
  };

  const DeveloperLinks = () => {
    <>
      <Link href="#">
        <a className="mr-5 hover:text-gray-900">Bugs</a>
      </Link>

      <Link href="#">
        <a className="mr-5 hover:text-gray-900">Projects</a>
      </Link>
    </>;
  };

  const QALinks = () => {
    <>
      <Link href="#">
        <a className="mr-5 hover:text-gray-900">Bugs</a>
      </Link>

      <Link href="#">
        <a className="mr-5 hover:text-gray-900">Projects</a>
      </Link>
    </>;
  };

  return pathname !== "/login" ? (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <Logo />
          </a>
        </Link>

        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <AdminLinks />
        </nav>
        {!user ? (
          <>
            <Link href="/login">
              <a>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                  Login
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 ml-1"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </a>
            </Link>
          </>
        ) : (
          <>
            <button
              className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
              onClick={() => {
                supabase.auth.signOut();
                router.push("/login");
              }}
            >
              Logout
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </>
        )}
      </div>
    </header>
  ) : null;
};

export { Navbar };
