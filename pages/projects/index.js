import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Flex, Heading } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import {
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
