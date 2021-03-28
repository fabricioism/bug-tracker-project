import { useMemo } from "react";
import useSWR from "swr";
import { supabase } from "@lib/initSupabase";
import fetcher from "@utils/fetcher";
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

  const { data: developers, error } = useSWR("/api/developers", fetcher);
  console.log(`developers`, developers);

  if (error) return <div>failed to load</div>;
  if (!developers) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      <Flex justify="flex-start" margin="5px 10px 20px 10px">
        <Heading size="lg">Developers</Heading>
      </Flex>
      <ReactTable
        data={developers}
        columns={columns}
        cellValueHandler={cellValueHandler}
      />
    </PrivateRoute>
  );
};

export default Developers;
