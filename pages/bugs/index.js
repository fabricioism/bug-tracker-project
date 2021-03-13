import { Flex, Heading } from "@chakra-ui/react";
import { TableSkeleton } from "@/components/molecules/index";
import { CreateBugModal } from "@/components/organisms/index";
import { PrivateRoute } from "@/components/routing/PrivateRoute";

const Bugs = () => {
  const headers = [
    "Descripción",
    "Prioridad",
    "Estado",
    "Fecha de inicio",
    "Fecha de finalización",
  ];

  return (
    <PrivateRoute>
      <Flex justify="flex-start" margin="5px 10px 20px 10px">
        <Heading size="lg">Bugs</Heading>
      </Flex>
      <Flex justify="flex-end" margin="15px 10px 30px 10px">
        <CreateBugModal />
      </Flex>
      <TableSkeleton headers={headers} />
    </PrivateRoute>
  );
};

export default Bugs;
