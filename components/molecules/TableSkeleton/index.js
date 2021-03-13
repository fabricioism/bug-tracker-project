import { Box, Skeleton } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "@/components/molecules/index";

const SkeletonRow = ({ width, headers }) => (
  <Box as="tr">
    {headers.map(() => (
      <Td key={Math.random().toString(36).substring(7)}>
        <Skeleton height="10px" w={width} my={4} />
      </Td>
    ))}
  </Box>
);

const SkeletonHeader = ({ header }) => {
  return <Th>{header}</Th>;
};

const TableSkeleton = ({ headers }) => {
  return (
    <Table w="full">
      <thead>
        <Tr>
          {headers.map((header) => (
            <SkeletonHeader
              header={header}
              key={Math.random().toString(36).substring(7)}
            />
          ))}
        </Tr>
      </thead>
      <tbody>
        {headers.map(() => (
          <SkeletonRow
            width="125px"
            headers={headers}
            key={Math.random().toString(36).substring(7)}
          />
        ))}
      </tbody>
    </Table>
  );
};

export { TableSkeleton };
