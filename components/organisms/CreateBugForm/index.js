import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CreateBugForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button mt={4} colorScheme="teal" type="submit" width="200px">
        Guardar
      </Button>
    </form>
  );
};

export { CreateBugForm };
