import { Flex } from "@chakra-ui/react";
import { CreateBugModal } from "@/components/organisms/index";

const Bugs = () => {
  return (
    <>
      <Flex justify="flex-end" margin="10px 10px 10px">
        <CreateBugModal />
      </Flex>
    </>
  );
};

export default Bugs;
