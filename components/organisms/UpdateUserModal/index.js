import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { UpdateUser } from "@lib/db";
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
  Switch,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

// import { supabase } from "@lib/initSupabase";

export const UpdateUserModal = ({ user, children }) => {
  console.log(`user`, user);
  const [languages, setLanguages] = useState(
    user?.programingLanguages ? user?.programingLanguages : []
  );

  const [technologies, setTechnologies] = useState(
    user?.technologies ? user?.technologies : []
  );

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onUpdateUser = async (data) => {
    try {
      /** Creating the user  */
      console.log(`data`, data);

      const { data: response, error } = await UpdateUser(user?.id, {
        ...data,
        languages,
        technologies,
      });
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

      console.log(`error`, error);

      mutate("/api/developers");

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
      <Button id="update-user-modal-button" onClick={onOpen} variant="link">
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateUser)}>
          <ModalHeader>Actualizando datos del usuario</ModalHeader>
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
                  key={user?.name}
                  defaultValue={user?.name}
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

              <FormControl id="active" mt={3}>
                <FormLabel ml={2}>Activo</FormLabel>
                <Switch
                  id="active"
                  name="active"
                  size="lg"
                  colorScheme="teal"
                  ref={register}
                  defaultChecked={user?.active}
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
