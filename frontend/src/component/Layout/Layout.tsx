import { ReactNode, useContext } from "react";

import { ConnectionsContext } from "../../contexts/ConnectionsContext";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

type LayoutChildren = {
  children: ReactNode;
};

// components

const Layout = ({ children }: LayoutChildren) => {
  const { daemon, wallet } = useContext(ConnectionsContext);
  return (
    <main className="bg-base-300">
      {daemon && wallet && <Navbar />}
      {children}
      {daemon && wallet && <Footer />}
    </main>
  );
};

export default Layout;
