import { useState } from "react";
import { Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

const CreateProjectForm = () => {
  const [selected, setselected] = useState({});
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log("selected", selected);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <FormControl id="name" isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input
            placeholder="Nombre del proyecto"
            ref={register}
            id="name"
            name="name"
          />
        </FormControl>

        <FormControl id="startDate" isRequired>
          <FormLabel>Fecha de inicio del proyecto</FormLabel>
          <input
            type="date"
            id="startDate"
            name="startDate"
            min="2021-03-12"
            ref={register}
          />
        </FormControl>

        <FormControl id="endDate" isRequired>
          <FormLabel>Fecha de finalización del proyecto</FormLabel>
          <input
            type="date"
            id="endDate"
            name="endDate"
            min="2021-03-12"
            value="2021-03-12"
            ref={register}
          />
        </FormControl>
      </Stack>
      <Button mt={4} colorScheme="teal" type="submit" width="200px">
        Guardar
      </Button>
    </form>
  );
};

export { CreateProjectForm };
