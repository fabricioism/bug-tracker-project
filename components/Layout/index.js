import { Footer } from "../molecules/Footer";
import { Navbar } from "../molecules/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />

      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-10 mx-auto">{children}</div>
      </section>

      <Footer />
    </>
  );
};

export { Layout };
