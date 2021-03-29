import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Flex, Heading, HStack, Tag } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { CreateProjectModal, ReactTable } from "@/components/organisms/index";
import { PrivateRoute } from "@/components/routing/PrivateRoute";

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
  { Header: "active", accessor: "active" },
  { Header: "Name", accessor: "name" },
  { Header: "End date", accessor: "endDate" },
  { Header: "Start date", accessor: "startDate" },
];

const Projects = () => {
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);

  const { data: projects, error } = useSWR("/api/projects", fetcher);

  if (error) return <div>failed to load</div>;
  if (!projects) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
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
    </PrivateRoute>
  );
};

export default Projects;
