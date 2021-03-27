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
// import { supabase } from "@lib/initSupabase";

const CreateDeveloperModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateDeveloper = async (data) => {
    try {
      /** Creating the user  */
      console.log(`data`, data);

      toast({
        title: "Éxito!",
        description:
          "Haz creado un nuevo desarrollador. Dile que revise su bandeja de correo",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error!",
        description: "Ha ocurrido un error, intentelo de nuevo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Añadir desarrollador</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateDeveloper)}>
          <ModalHeader>Agregar nuevo desarrollador</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel>Nombre</FormLabel>
                <Input
                  placeholder="Ingresa el nombre"
                  ref={register}
                  id="name"
                  name="name"
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

              <FormControl id="programmingLanguages" isRequired>
                <FormLabel>Lenguajes de programación</FormLabel>
                <Textarea
                  placeholder="Lenguajes de programación que maneja"
                  ref={register}
                  id="programmingLanguages"
                  name="programmingLanguages"
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
