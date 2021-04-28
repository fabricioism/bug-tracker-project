import Head from "next/head";
import { useMemo, useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Flex, Heading, HStack, Tag, Spinner } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { ReactTable, UpdateUserModal } from "@/components/organisms/index";
import { PrivateRoute } from "@/components/routing/PrivateRoute";
import { Auth } from "@supabase/ui";
import Lottie from "react-lottie";
import LottieForbidden from "../../../public/forbidden.json";
import { defaultOptions } from "@/constants/lottieOptions";

const cellValueHandler = ({ cell, row }) => {
  let value;
  switch (cell.column.id) {
    case "active":
      value = row.values.active ? "✅" : "❌";
      break;
    case "email":
      value = (
        <UpdateUserModal user={row.original} children={row.values.email} />
      );
      break;
    case "roles":
      value = (
        <Tag
          colorScheme={
            row.values.roles?.id == 1
              ? "red"
              : row.values.roles?.id == 2
              ? "cyan"
              : row.values.roles?.id == 3
              ? "green"
              : "orange"
          }
        >
          {row.values.roles?.name}
        </Tag>
      );
      break;
    case "programingLanguages":
      value = (
        <HStack spacing={4}>
          {row.values.programingLanguages?.map((language) => (
            <Tag colorScheme="purple" key={language}>
              {language}
            </Tag>
          ))}
        </HStack>
      );
      break;
    case "technologies":
      value = (
        <HStack spacing={4}>
          {row.values.technologies?.map((tech) => (
            <Tag colorScheme="red" key={tech}>
              {tech}
            </Tag>
          ))}
        </HStack>
      );
      break;
    default:
      value = cell.render("Cell");
      break;
  }
  return value;
};

const fields = [
  { Header: "Email", accessor: "email" },
  { Header: "Name", accessor: "name" },
  { Header: "Role", accessor: "roles" },
];

const Users = () => {
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);
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

  const { data: users, error } = useSWR("/api/users", fetcher);

  if (error) return <div>failed to load</div>;
  if (!users) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      {userData?.role == 2 ? (
        <>
          {" "}
          <Head>
            <title>Users | Bug tracker</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Flex justify="flex-start" margin="5px 10px 20px 10px">
            <Heading size="lg">Users</Heading>
          </Flex>
          <ReactTable
            data={users}
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

export default Users;
