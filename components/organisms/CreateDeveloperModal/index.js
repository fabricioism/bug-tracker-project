import { useState } from "react";
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
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import { supabase } from "@lib/initSupabase";

const CreateDeveloperModal = () => {
  const user = supabase.auth.user();

  const [languages, setLanguages] = useState([]);
  const [technologies, setTechnologies] = useState([]);

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

      onClose();
    } catch (error) {
      toast({
        title: "Error!",
        description: "Ha ocurrido un error, intentelo de nuevo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      onClose();
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

              <FormControl id="programmingLanguages">
                <FormLabel>Lenguajes de programación</FormLabel>
                <ReactTagInput
                  removeOnBackspace
                  tags={languages}
                  onChange={(newLanguages) => setLanguages(newLanguages)}
                />
              </FormControl>

              <FormControl id="technologies">
                <FormLabel>Tecnologías</FormLabel>
                <ReactTagInput
                  removeOnBackspace
                  tags={technologies}
                  onChange={(newTechnologies) =>
                    setTechnologies(newTechnologies)
                  }
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
