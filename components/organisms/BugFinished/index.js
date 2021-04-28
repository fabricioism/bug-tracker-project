import { useState } from "react";
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
  Toas,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { supabase } from "@lib/initSupabase";

export const BugFinished = ({ bug, children }) => {
  const [dev, setDeveloper] = useState({
    label: bug?.users?.name,
    value: bug?.users?.id,
  });
  const [project, setProject] = useState({
    label: bug?.project?.name,
    value: bug?.project?.id,
  });

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onUpdateBug = async () => {
    try {
      const { data, error } = await supabase
        .from("bug")
        .update({ bugstate: 5, endDate: new Date().toDateString() })
        .eq("id", bug?.id);

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
      <Button
        id="update-bug-modal-button"
        colorScheme={"green"}
        onClick={onOpen}
      >
        {children}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onUpdateBug)}>
          <ModalHeader>Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>Are you sure to mark this bug as done?</ModalBody>
          <ModalFooter>
            <Stack spacing={4} direction="row">
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" mr={3} type="submit">
                Confirm
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
