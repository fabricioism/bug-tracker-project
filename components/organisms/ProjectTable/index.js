import { Box } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "@/components/molecules/index";

const ProjectTable = ({ projects }) => {
  return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Identity</Th>
            <Th>Phone Number</Th>
            <Th width="50px">{""}</Th>
          </Tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <Box as="tr" key={project.id}>
              <Td fontWeight="medium">{project.name}</Td>
              <Td fontWeight="medium">{project.startDate}</Td>
              <Td fontWeight="medium">{project.endDate}</Td>
              <Td fontWeight="medium">{project.active}</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};

export { ProjectTable };
