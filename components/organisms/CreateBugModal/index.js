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
import { bugStates, priorities } from "@/constants/states";
import { CreateBug } from "@lib/db";

const CreateBugModal = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateBug = async (data) => {
    try {
      const newBug = data;

      const { data: response, error } = await CreateBug(data);

      toast({
        title: error === null ? "Éxito!" : "Error",
        description:
          error === null
            ? "Haz creado una alerta de bug"
            : "Ocurrió un error, intente de nuevo.",
        status: error === null ? "success" : "error",
        duration: 2500,
        isClosable: true,
      });

      mutate("/api/bugs");

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
                  placeholder="Ingresa el nombre"
                  ref={register}
                  id="name"
                  name="name"
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Descripción</FormLabel>
                <Textarea
                  placeholder="Descripción del bug"
                  id="description"
                  name="description"
                  resize={"horizontal"}
                  size={"md"}
                  ref={register}
                />
              </FormControl>

              <FormControl id="priority" isRequired>
                <FormLabel>Priority</FormLabel>
                <Select id="priority" name="priority" ref={register}>
                  {Object.entries(priorities).map((item) => (
                    <option value={item[1]["value"]}>{item[1]["label"]}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="bugstate" isRequired>
                <FormLabel>Bug state</FormLabel>
                <Select id="bugstate" name="bugstate" ref={register}>
                  {Object.entries(bugStates).map((item) => (
                    <option value={item[1]["value"]}>{item[1]["label"]}</option>
                  ))}
                </Select>
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
