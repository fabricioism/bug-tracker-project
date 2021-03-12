import Head from "next/head";
import { CreateView } from "@/components/views/index";
import { CreateDeveloperForm } from "@/components/organisms/index";
const add = () => {
  return (
    <>
      <Head>
        <title>Bug Tracker | Creación de desarrolladores</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <CreateView title={"Creación de desarrolladores"}>
        <CreateDeveloperForm />
      </CreateView>
    </>
  );
};

export default add;
