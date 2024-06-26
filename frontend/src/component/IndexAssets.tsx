import { useContext } from "react";

// components
import { WelcomeConnect } from "./WelcomeConnect";
import { Dashboard } from "./Dashboard";

import { ConnectionsContext } from "../contexts/ConnectionsContext";

export const IndexAssets = () => {
  const { daemon, wallet } = useContext(ConnectionsContext);

  return <>{daemon && wallet ? <Dashboard /> : <WelcomeConnect />}</>;
};
