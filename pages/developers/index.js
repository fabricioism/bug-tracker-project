import { Flex, Heading } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { CreateDeveloperModal } from "@/components/organisms/index";

const Developers = () => {
  const headers = [
    "Nombre",
    "Email",
    "Lenguajes de programación",
    "Tecnologías",
  ];

  return (
    <>
      <Flex justify="flex-start" margin="5px 10px 20px 10px">
        <Heading size="lg">Desarrolladores</Heading>
      </Flex>
      <Flex justify="flex-end" margin="15px 10px 30px 10px">
        <CreateDeveloperModal />
      </Flex>
      <TableSkeleton headers={headers} />
    </>
  );
};

export default Developers;