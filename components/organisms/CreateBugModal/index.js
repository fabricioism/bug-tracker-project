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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { bugStates, priorities } from "@/constants/states";
import { CreateBug } from "@lib/db";
import { AS as AsyncSelect } from "@/components/atoms/index";
import { supabase } from "@lib/initSupabase";

const CreateBugModal = () => {
  const [dev, setDeveloper] = useState({});
  const [project, setProject] = useState({});
  const toast = useToast();
  const user = supabase.auth.user();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();

  const onCreateBug = async (data) => {
    try {
      let newBug = {
        ...data,
        qa: user?.id,
        bugstate: Object.keys(dev).length ? 2 : 1,
        developer: Object.keys(dev).length ? dev?.value : null,
        project: Object.keys(project).length ? project?.value : null,
      };

      const { data: response, error } = await CreateBug(newBug);
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
      <Button onClick={onOpen}>Add Bug</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateBug)}>
          <ModalHeader>Add new bug alert</ModalHeader>
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
                />
              </FormControl>

              <FormControl id="priority" isRequired>
                <FormLabel>Priority</FormLabel>
                <Select id="priority" name="priority" ref={register}>
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
                  setFunction={setProject}
                />
              </FormControl>

              {/* <FormControl id="developers" mt={3}>
                <FormLabel>Developer</FormLabel>
                <AsyncSelect
                  api="/api/developers"
                  valueField="id"
                  labelField="name"
                  isMulti={false}
                  setFunction={setDeveloper}
                />
              </FormControl> */}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              isDisabled={!Object.keys(project).length}
              type="submit"
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export { CreateBugModal };
