import { Flex, Heading } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { CreateProjectModal } from "@/components/organisms/index";

const Projects = () => {
  const headers = [
    "Nombre del proyecto",
    "Fecha de inicio",
    "Fecha de finalización",
    "Estado",
  ];

  return (
    <>
      <Flex justify="flex-start" margin="5px 10px 20px 10px">
        <Heading size="lg">Proyectos</Heading>
      </Flex>
      <Flex justify="flex-end" margin="15px 10px 30px 10px">
        <CreateProjectModal />
      </Flex>

      <TableSkeleton headers={headers} />
    </>
  );
};

export default Projects;
