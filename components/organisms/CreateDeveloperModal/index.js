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

const CreateDeveloperModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateDeveloper = (data) => {
    console.log("data", data);
    toast({
      title: "Éxito!",
      description: "Haz creado un nuevo desarrollador.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <>
      <Button onClick={onOpen}>Añadir desarrollador</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateDeveloper)}>
          <ModalHeader>Crear proyecto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="firstName" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Ingresa el nombre"
                  ref={register}
                  id="firstName"
                  name="firstName"
                />
              </FormControl>

              <FormControl id="lastName" isRequired>
                <FormLabel>Apellido</FormLabel>
                <Input
                  placeholder="Ingresa el apellido"
                  ref={register}
                  id="lastName"
                  name="lastName"
                />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="nombre@dominio.com"
                  ref={register}
                  type="email"
                  id="email"
                  name="email"
                />
              </FormControl>

              <FormControl id="languages" isRequired>
                <FormLabel>Lenguajes de programación</FormLabel>
                <Textarea
                  placeholder="Lenguajes de programación que maneja"
                  ref={register}
                  id="languages"
                  name="languages"
                  resize={"horizontal"}
                  size={"md"}
                />
              </FormControl>

              <FormControl id="technologies" isRequired>
                <FormLabel>Tecnologías</FormLabel>
                <Textarea
                  placeholder="Tecnologías que maneja"
                  ref={register}
                  id="technologies"
                  name="technologies"
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

export { CreateDeveloperModal };
