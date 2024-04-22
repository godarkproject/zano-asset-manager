import { useContext } from "react";

// components
import { WelcomeConnect } from "./WelcomeConnect";

import { ConnectionsContext } from "../contexts/ConnectionsContext";
import { Airdrop } from "./Airdrop";

export const IndexAirdrop = () => {
  const { daemon, wallet } = useContext(ConnectionsContext);

  return <>{daemon && wallet ? <Airdrop /> : <WelcomeConnect />}</>;
};
