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
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

const CreateBugModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateBug = (data) => {
    console.log("data", data);
    toast({
      title: "Éxito!",
      description: "Haz creado una alerta de Bug.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Añadir nuevo Bug</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateBug)}>
          <ModalHeader>Crear alerta de Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Nombre del bug"
                  ref={register}
                  id="name"
                  name="name"
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción del bug"
                  ref={register}
                  id="description"
                  name="description"
                  resize={"horizontal"}
                  size={"md"}
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

export { CreateBugModal };
