import { PrivateRoute } from "@/components/routing/PrivateRoute";
import { DonutChart } from "@/components/molecules/index";
import { useState, useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Auth } from "@supabase/ui";
import Image from "next/image";
import Head from "next/head";
export default function Home() {
  const [userData, setUserData] = useState(null);

  const { session } = Auth.useUser();
  const { data, error: userError } = useSWR(
    session ? ["/api/users/data", session.access_token] : null,
    fetcher
  );

  useEffect(() => {
    if (userError) return <div>failed to load</div>;
    if (!data) return <Spinner />;
    if (data) setUserData(data[0]);
  }, [data]);

  const { data: bugs, error } = useSWR("/api/bugs", fetcher);

  if (error) return <div>failed to load</div>;
  if (!bugs) return <Spinner />;

  const newBugs = bugs?.filter((bug) => bug?.bugstate == 1)?.length;

  const assignedBugs = bugs?.filter((bug) => bug?.bugstate == 2)?.length;

  const doneBugs = bugs?.filter((bug) => bug?.bugstate == 5)?.length;

  const numbers = [newBugs, assignedBugs, doneBugs];

  return (
    <PrivateRoute>
      <Head>
        <title>Home | Bug tracker</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-10 mt-10">
          Welcome to the best bug tracker tool!
        </h1>
      </div>
      <div className="flex flex-wrap flex-col items-center">
        {userData?.role == 2 ? (
          <div style={{ marginBottom: "15px" }}>
            <DonutChart numbers={numbers} />
          </div>
        ) : (
          <Image
            src="https://zdzsyykqcghvtgnapyon.supabase.co/storage/v1/object/sign/bugtracker/pitch.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJidWd0cmFja2VyL3BpdGNoLnN2ZyIsImlhdCI6MTYxODIxODk0MiwiZXhwIjoxOTMzNTc4OTQyfQ.kopJB87xIEMAYgeDu0KiN3x4VdLoYccdTcLPNt8tg9M"
            width="480"
            height="435"
            alt="Bug tracker"
          />
        )}
      </div>
    </PrivateRoute>
  );
}
