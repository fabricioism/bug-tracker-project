import { Flex } from "@chakra-ui/react";
import { CreateProjectModal } from "@/components/organisms/index";

const Projects = () => {
  return (
    <>
      <Flex justify="flex-end" margin="10px 10px 10px">
        <CreateProjectModal />
      </Flex>
    </>
  );
};

export default Projects;
