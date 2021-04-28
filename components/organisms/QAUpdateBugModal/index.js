import { useState } from "react";
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
import { AS as AsyncSelect } from "@/components/atoms/index";

export const QAUpdateBugModal = ({ bug, children }) => {
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

  const onUpdateBug = async (data) => {
    try {
      let newBug = {
        ...data,
        project: Object.keys(project).length ? project?.value : null,
      };

      const { data: response, error } = await UpdateBug(bug?.id, newBug);

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
          <ModalHeader>Updating bug alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack spacing="6">
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Write here bug name"
                  ref={register}
                  id="name"
                  name="name"
                  key={bug?.name}
                  defaultValue={bug?.name}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Write here the description about the bug"
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
                    <option value={item[1]["value"]} key={item[1]["value"]}>
                      {item[1]["label"]}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl id="project" mt={3} isRequired>
                <FormLabel>Project</FormLabel>
                <AsyncSelect
                  api="/api/projects"
                  valueField="id"
                  labelField="name"
                  isMulti={false}
                  defaultValue={project}
                  setFunction={setProject}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack spacing={4} direction="row">
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
