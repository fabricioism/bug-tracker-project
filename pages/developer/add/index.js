import { CreateView } from "@/components/views/index";
import { CreateDeveloperForm } from "@/components/organisms/index";
const add = () => {
  return (
    <CreateView title={"Creación de desarrolladores"}>
      <CreateDeveloperForm />
    </CreateView>
  );
};

export default add;
