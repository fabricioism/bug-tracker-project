import Head from "next/head";
import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Auth } from "@supabase/ui";
import Lottie from "react-lottie";
import LottieForbidden from "../../../public/forbidden.json";
import { defaultOptions } from "@/constants/lottieOptions";
import { Flex, Heading, HStack, Tag } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { ReactTable, UpdateUserModal } from "@/components/organisms/index";
import { PrivateRoute } from "@/components/routing/PrivateRoute";

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
  { Header: "Programing languages", accessor: "programingLanguages" },
  { Header: "Technologies", accessor: "technologies" },
  { Header: "Active", accessor: "active" },
];

const Developers = () => {
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);

  const { session } = Auth.useUser();
  const { data: userData, error: userError } = useSWR(
    session ? ["/api/users/data", session.access_token] : null,
    fetcher
  );

  if (userError) return <div>failed to load</div>;
  if (!userData) return <Spinner />;

  const { data: developers, error } = useSWR("/api/developers", fetcher);

  if (error) return <div>failed to load</div>;
  if (!developers) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      {userData[0]?.role == 2 ? (
        <>
          {" "}
          <Head>
            <title>Developers | Bug tracker</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Flex justify="flex-start" margin="5px 10px 20px 10px">
            <Heading size="lg">Developers</Heading>
          </Flex>
          <ReactTable
            data={developers}
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

export default Developers;
