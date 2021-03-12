import Head from "next/head";
import { CreateView } from "@/components/views/index";
import { CreateProjectForm } from "@/components/organisms/index";
const add = () => {
  return (
    <>
      <Head>
        <title>Bug Tracker | Creación de proyectos</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CreateView title={"Creación de proyectos"}>
        <CreateProjectForm />
      </CreateView>
    </>
  );
};

export default add;
