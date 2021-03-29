import { useForm } from "react-hook-form";
import { mutate } from "swr";
import { UpdateBug } from "@lib/db";
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

export const UpdateBugModal = ({ bug, children }) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onUpdateBug = async (data) => {
    try {
      const { data: response, error } = await UpdateBug(bug?.id, data);

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
      <Button id="update-bug-modal-button" onClick={onOpen} variant="link">
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateBug)}>
          <ModalHeader>Actualizando datos del bug</ModalHeader>
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
                  key={bug?.name}
                  defaultValue={bug?.name}
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
                  key={bug?.id}
                  defaultValue={bug?.description}
                />
              </FormControl>

              <FormControl id="priority" isRequired>
                <FormLabel>Priority</FormLabel>
                <Select
                  defaultValue={bug?.priority}
                  id="priority"
                  name="priority"
                  ref={register}
                >
                  {Object.entries(priorities).map((item) => (
                    <option value={item[1]["value"]}>{item[1]["label"]}</option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="bugstate" isRequired>
                <FormLabel>Bug state</FormLabel>
                <Select
                  defaultValue={bug?.bugstate}
                  id="bugstate"
                  name="bugstate"
                  ref={register}
                >
                  {Object.entries(bugStates).map((item) => (
                    <option value={item[1]["value"]}>{item[1]["label"]}</option>
                  ))}
                </Select>
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
