import { useForm } from "react-hook-form";
import { mutate } from "swr";
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
  Select,
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { CreteProject } from "@lib/db";

const CreateProjectModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateProject = async (data) => {
    try {
      const { data: response, error } = await CreteProject(data);

      toast({
        title: error === null ? "Éxito!" : "Error",
        description:
          error === null
            ? "Haz creado un proyecto"
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
      <Button onClick={onOpen}>Añadir Proyecto</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateProject)}>
          <ModalHeader>Crear proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre del proyecto"
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
                  ref={register}
                />
              </FormControl>

              <FormControl id="endDate">
                <FormLabel>Fecha de finalización del proyecto</FormLabel>
                <input type="date" id="endDate" name="endDate" ref={register} />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreateProjectModal };
