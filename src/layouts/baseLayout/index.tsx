import { FC, ReactNode } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";

interface BaseLayotProps {
  children: ReactNode;
}

const BaseLayout: FC<BaseLayotProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default BaseLayout;
