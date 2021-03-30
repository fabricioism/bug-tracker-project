import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { UpdateProject } from "@lib/db";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
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

export const UpdateProjectModal = ({ project, children }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onUpdateProject = async (data) => {
    try {
      const { data: response, error } = await UpdateProject(project?.id, data);

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

      mutate("/api/projects");

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
      <Button id="update-bug-modal-button" onClick={onOpen} variant="link">
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateProject)}>
          <ModalHeader>Actualizando datos del bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre del proyecto"
                  defaultValue={project?.name}
                  ref={register}
                  id="name"
                  name="name"
                />
              </FormControl>

              <FormControl id="startDate">
                <FormLabel>Fecha de inicio del proyecto</FormLabel>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  defaultValue={project?.startDate}
                  ref={register}
                />
              </FormControl>

              <FormControl id="endDate">
                <FormLabel>Fecha de finalización del proyecto</FormLabel>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  defaultValue={project?.endDate}
                  ref={register}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancelar</Button>
            <Button colorScheme="blue" mr={3} type="submit">
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
