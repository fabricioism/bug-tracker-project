import { Box } from "@chakra-ui/react";
import { Table, Tr, Th, Td } from "@/components/molecules/index";

const DeveloperTable = ({ developers }) => {
    return (
    <Box overflowX="scroll">
      <Table w="full">
        <thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Correo electrónico</Th>
            <Th>Lenguajes de programación</Th>
            <Th>Tecnologías</Th>
            <Th width="50px">{''}</Th>
          </Tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Box as="tr" key={contact.id}>
              <Td fontWeight="medium">{contact.name}</Td>
              <Td fontWeight="medium">{contact.email}</Td>
              <Td fontWeight="medium">{contact.programmingLanguages}</Td>
              <Td fontWeight="medium">{contact.technologies}</Td>
            </Box>
          ))}
        </tbody>
      </Table>
    </Box>
  );
};
};

export { DeveloperTable };
