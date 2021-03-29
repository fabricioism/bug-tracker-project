import { useMemo } from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { TableSkeleton } from "@/components/molecules/index";
import {
  CreateBugModal,
  ReactTable,
  UpdateBugModal,
} from "@/components/organisms/index";
import { bugStates, priorities } from "@/constants/states";
import { PrivateRoute } from "@/components/routing/PrivateRoute";

const cellValueHandler = ({ cell, row }) => {
  let value;
  switch (cell.column.id) {
    case "action":
      value = (
        <Tooltip label="Mark as done">
          <IconButton aria-label="bug done" icon={<AiOutlineCheck />} />
        </Tooltip>
      );
      break;
    case "active":
      value = row.values.active ? "✅" : "❌";
      break;
    case "name":
      value = <UpdateBugModal bug={row.original} children={row.values.name} />;
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
        >
          <path
            fill="currentColor"
            d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
          />
        </Icon>
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
  { Header: "description", accessor: "description" },
  { Header: "Bug state", accessor: "bugstate" },
  { Header: "Priority", accessor: "priority" },
  { Header: "Start date", accessor: "startDate" },
  { Header: "End date", accessor: "endDate" },
  { Header: "Active", accessor: "active" },
  { Header: "Actions", accessor: "action" },
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
