import Head from "next/head";
import { useMemo, useState } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Auth } from "@supabase/ui";
import Lottie from "react-lottie";
import LottieForbidden from "../../../public/forbidden.json";
import { defaultOptions } from "@/constants/lottieOptions";
import {
  Flex,
  Heading,
  Icon,
  IconButton,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { TableSkeleton } from "@/components/molecules/index";
import { ReactTable } from "@/components/organisms/index";
import { bugStates, priorities } from "@/constants/states";
import { PrivateRoute } from "@/components/routing/PrivateRoute";
import { supabase } from "@lib/initSupabase";

const cellValueHandler = ({ cell, row }) => {
  let value;
  switch (cell.column.id) {
    case "action":
      value = (
        <Tooltip
          label="Mark as done"
          key={Math.random().toString(36).substring(7)}
        >
          <IconButton
            aria-label="bug done"
            icon={<AiOutlineCheck />}
            key={Math.random().toString(36).substring(7)}
          />
        </Tooltip>
      );
      break;
    case "active":
      value = row.values.active ? "✅" : "❌";
      break;

    case "bugstate":
      value = (
        <Tag colorScheme={bugStates[row.values.bugstate]["color"]}>
          {bugStates[row.values.bugstate]["label"]}
        </Tag>
      );
      break;
    case "priority":
      value = (
        <Icon
          viewBox="0 0 20 20"
          color={priorities[row.values.priority]["color"]}
          key={Math.random().toString(36).substring(7)}
        >
          <Tooltip label={priorities[row.values.priority]["label"]}>
            <path
              fill="currentColor"
              d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
            />
          </Tooltip>
        </Icon>
      );
      break;
    case "project":
      value = <p>{row.values.project.name}</p>;
      break;
    default:
      value = cell.render("Cell");
      break;
  }
  return value;
};

const fields = [
  { Header: "Name", accessor: "name" },
  { Header: "description", accessor: "description" },
  { Header: "Project", accessor: "project" },
  { Header: "Bug state", accessor: "bugstate" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Start date", accessor: "startDate" },
  { Header: "End date", accessor: "endDate" },
];

const Bugs = () => {
  const user = supabase.auth.user();
  const [project, setProject] = useState({});
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);

  const { session } = Auth.useUser();
  const { data: userData, error: userError } = useSWR(
    session ? ["/api/users/data", session.access_token] : null,
    fetcher
  );

  if (userError) return <div>failed to load</div>;
  if (!userData) return <Spinner />;

  const { data: bugs, error } = useSWR(
    user ? ["/api/developers/bugs", user?.id] : null,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!bugs) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      {userData[0]?.role == 3 ? (
        <>
          <Head>
            <title>Bugs | Bug tracker</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Flex justify="flex-start" margin="5px 10px 20px 10px">
            <Heading size="lg">Bugs</Heading>
          </Flex>
          <ReactTable
            data={bugs}
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

export default Bugs;
