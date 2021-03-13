import { Flex } from "@chakra-ui/react";
import { CreateDeveloperModal } from "@/components/organisms/index";

const Developers = () => {
  return (
    <>
      <Flex justify="flex-end" margin="10px 10px 10px">
        <CreateDeveloperModal />
      </Flex>
    </>
  );
};

export default Developers;
