import { useTable } from "react-table";
import { Box } from "@chakra-ui/react";
import { Table, Td, Th, Tr } from "@/components/molecules/index";

export const ReactTable = ({ data, columns, cellValueHandler }) => {
  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <Box overflowX="scroll">
      <Table {...getTableProps()} w="full">
        <thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Box as="tr" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <Td fontWeight="medium" {...cell.getCellProps()}>
                      {cellValueHandler({ cell, row })}
                    </Td>
                  );
                })}
              </Box>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};
