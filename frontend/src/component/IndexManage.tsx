import { useContext } from "react";

// components
import { WelcomeConnect } from "./WelcomeConnect";

import { ConnectionsContext } from "../contexts/ConnectionsContext";
import { ManageAssets } from "./ManageAssets";

export const IndexManage = () => {
  const { daemon, wallet } = useContext(ConnectionsContext);

  return <>{daemon && wallet ? <ManageAssets /> : <WelcomeConnect />}</>;
};
