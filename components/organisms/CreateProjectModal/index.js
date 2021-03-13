import { useForm } from "react-hook-form";
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

const CreateProjectModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateProject = (data) => {
    console.log("data", data);
    toast({
      title: "Éxito!",
      description: "Haz creado un nuevo contacto.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
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

              <FormControl id="startDate" isRequired>
                <FormLabel>Fecha de inicio del proyecto</FormLabel>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  min="2021-03-12"
                  ref={register}
                />
              </FormControl>

              <FormControl id="endDate" isRequired>
                <FormLabel>Fecha de finalización del proyecto</FormLabel>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  min="2021-03-12"
                  value="2021-03-12"
                  ref={register}
                />
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
