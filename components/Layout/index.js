import { Footer, Navbar } from "@/components/molecules/index";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-10 mx-auto">{children}</div>
      </section>

      <Footer />
    </>
  );
};

export { Layout };
