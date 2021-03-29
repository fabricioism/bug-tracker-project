import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Flex, Heading, HStack, Tag } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { CreateBugModal, ReactTable } from "@/components/organisms/index";
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
  { Header: "Bug state", accessor: "bugState" },
  { Header: "description", accessor: "description" },
  { Header: "Priority", accessor: "priority" },
  { Header: "End date", accessor: "endDate" },
  { Header: "Start date", accessor: "startDate" },
];

const Bugs = () => {
  const columns = useMemo(() => fields, []);
  const headers = fields.map((header) => header.Header);

  const { data: bugs, error } = useSWR("/api/bugs", fetcher);

  if (error) return <div>failed to load</div>;
  if (!bugs) return <TableSkeleton headers={headers} />;

  return (
    <PrivateRoute>
      <Flex justify="flex-start" margin="5px 10px 20px 10px">
        <Heading size="lg">Bugs</Heading>
      </Flex>
      <Flex justify="flex-end" margin="15px 10px 30px 10px">
        <CreateBugModal />
      </Flex>
      <ReactTable
        data={bugs}
        columns={columns}
        cellValueHandler={cellValueHandler}
      />
    </PrivateRoute>
  );
};

export default Bugs;
