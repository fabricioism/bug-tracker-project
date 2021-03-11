import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CreateDeveloperForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button mt={4} colorScheme="teal" type="submit" width="200px">
        Guardar
      </Button>
    </form>
  );
};

export { CreateDeveloperForm };
