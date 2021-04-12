import Head from "next/head";
import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Auth } from "@supabase/ui";
import Lottie from "react-lottie";
import LottieForbidden from "../../../public/forbidden.json";
import { defaultOptions } from "@/constants/lottieOptions";
import { Flex, Heading } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { ReactTable } from "@/components/organisms/index";
import { PrivateRoute } from "@/components/routing/PrivateRoute";
import { supabase } from "@lib/initSupabase";

const cellValueHandler = ({ cell, row }) => {
  let value;
  switch (cell.column.id) {
    case "active":
      value = row.values.active ? "✅" : "❌";
      break;
    default:
      value = cell.render("Cell");
      break;
  }
  return value;
};

const fields = [
  { Header: "Name", accessor: "name" },
  { Header: "Start date", accessor: "startDate" },
  { Header: "End date", accessor: "endDate" },
  { Header: "active", accessor: "active" },
];

const Projects = () => {
  const user = supabase.auth.user();
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);

  const { session } = Auth.useUser();
  const { data: userData, error: userError } = useSWR(
    session ? ["/api/users/data", session.access_token] : null,
    fetcher
  );

  if (userError) return <div>failed to load</div>;
  if (!userData) return <Spinner />;

  const { data: projects, error } = useSWR(
    user ? ["/api/developers/projects", user?.id] : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!projects) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      {userData[0]?.role == 3 ? (
        <>
          <Head>
            <title>Projects | Bug tracker</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Flex justify="flex-start" margin="5px 10px 20px 10px">
            <Heading size="lg">Projects</Heading>
          </Flex>
          <ReactTable
            data={projects}
            columns={columns}
            cellValueHandler={cellValueHandler}
          />
        </>
      ) : (
        <Lottie
          options={{
            ...defaultOptions,
            animationData: LottieForbidden,
          }}
          height={"30%"}
          width={"30%"}
        />
      )}
    </PrivateRoute>
  );
};

export default Projects;
