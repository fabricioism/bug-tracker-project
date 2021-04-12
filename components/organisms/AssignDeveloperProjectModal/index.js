import { useState } from "react";
import { useForm } from "react-hook-form";
import { AssignDevelopersToProject } from "@lib/db";
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AS as AsyncSelect } from "@/components/atoms/index";

export const AssignDeveloperProjectModal = ({ project, children }) => {
  const [developers, setDevelopers] = useState(
    project?.projectxdeveloper?.map((dev) => {
      return { label: dev?.users?.name, value: dev?.users?.id };
    })
  );
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit } = useForm();

  const onAssignDeveloper = async (data) => {
    try {
      let newValues = developers.map((developer) => {
        return { project: project?.id, developer: developer?.value };
      });

      const { data: response, error } = await AssignDevelopersToProject(
        project?.id,
        newValues
      );

      toast({
        title: error === null ? "Éxito!" : "Error",
        description:
          error === null
            ? "Haz actualizado correctamente los datos."
            : "Ocurrió un error, intente de nuevo.",
        status: error === null ? "success" : "error",
        duration: 2500,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Error!",
        description: "Ocurrió un error, intente de nuevo.",
        status: "error",
        duration: 2500,
        isClosable: true,
      });

      onClose();
    }
  };

  return (
    <>
      <Button
        id="update-developers-modal-button"
        onClick={onOpen}
        variant="link"
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onAssignDeveloper)}>
          <ModalHeader>Assigning developers</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="developers" mt={3}>
                <FormLabel>Developers</FormLabel>
                <AsyncSelect
                  api="/api/developers"
                  valueField="id"
                  labelField="name"
                  isMulti={true}
                  defaultValue={developers}
                  setFunction={setDevelopers}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack spacing={4} direction="row">
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
