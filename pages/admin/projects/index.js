import Head from "next/head";
import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Auth } from "@supabase/ui";
import Lottie from "react-lottie";
import LottieForbidden from "../../../public/forbidden.json";
import { defaultOptions } from "@/constants/lottieOptions";
import {
  Avatar,
  Flex,
  Heading,
  Spinner,
  Tooltip,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import {
  AssignDeveloperProjectModal,
  CreateProjectModal,
  ReactTable,
  UpdateProjectModal,
} from "@/components/organisms/index";
import { PrivateRoute } from "@/components/routing/PrivateRoute";

const cellValueHandler = ({ cell, row }) => {
  let value;
  switch (cell.column.id) {
    case "active":
      value = row.values.active ? "✅" : "❌";
      break;
    case "name":
      value = (
        <UpdateProjectModal project={row.original} children={row.values.name} />
      );
      break;
    case "projectxdeveloper":
      value = (
        <Wrap>
          {row.values.projectxdeveloper.map((dev) => (
            <Tooltip
              label={dev?.users?.name}
              fontSize="md"
              key={dev?.users?.id}
            >
              <WrapItem key={dev?.users?.id}>
                <Avatar size="xs" name={dev?.users?.name} />
              </WrapItem>
            </Tooltip>
          ))}
        </Wrap>
      );
      break;
    case "assign":
      value = (
        <AssignDeveloperProjectModal
          project={row.original}
          children={"Assign developers"}
        />
      );
      break;
    default:
      value = cell.render("Cell");
      break;
  }
  return value;
};

const fields = [
  { Header: "Name", accessor: "name" },
  { Header: "Developers", accessor: "projectxdeveloper" },
  { Header: "Start date", accessor: "startDate" },
  { Header: "End date", accessor: "endDate" },
  { Header: "active", accessor: "active" },
  { Header: "", accessor: "assign" },
];

const Projects = () => {
  const [userData, setUserData] = useState(null);
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);

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

  const { data: projects, error } = useSWR("/api/projects", fetcher);

  if (error) return <div>failed to load</div>;
  if (!projects) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      {userData?.role == 2 ? (
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
          <Flex justify="flex-end" margin="15px 10px 30px 10px">
            <CreateProjectModal />
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
