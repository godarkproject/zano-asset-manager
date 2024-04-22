import { createContext, useEffect, useState } from "react";

// go
import { DaemonStatus, WalletStatus } from "../../wailsjs/go/main/App";

interface Props {
  children: React.ReactNode;
}

export type ConnectionsContextState = {
  wallet: boolean;
  daemon: boolean;
  walletFile: string;
  addWallet: (name: string) => void;
  walletPassword: string;
  addPassword: (name: string) => void;
};

const contextDefaultValues: ConnectionsContextState = {
  wallet: false,
  daemon: false,
  walletFile: "",
  addWallet: () => {},
  walletPassword: "",
  addPassword: () => {},
};

export const ConnectionsContext =
  createContext<ConnectionsContextState>(contextDefaultValues);

export const ConnectionsProvider = ({ children }: Props) => {
  const [wallet, setWallet] = useState<boolean>(contextDefaultValues.wallet);
  const [daemon, setDaemon] = useState<boolean>(contextDefaultValues.daemon);

  const [walletFile, setWalletFile] = useState<string>(
    contextDefaultValues.walletFile
  );
  const [walletPassword, setWalletPassword] = useState<string>(
    contextDefaultValues.walletPassword
  );

  useEffect(() => {
    const interval = setInterval(() => {
      DaemonStatus().then((res: boolean) => {
        setDaemon(res);
        // console.log(res);
      });

      if (daemon) {
        WalletStatus().then((res: boolean) => {
          setWallet(res);
          // console.log(res);
        });
      }

      if (wallet) {
        console.log(walletFile, walletPassword);
      }
    }, 2000);
    return () => clearInterval(interval);
  });

  const addWallet = (walletFile: string) => {
    console.log("adding wallet");
    setWalletFile(walletFile);
  };
  const addPassword = (password: string) => {
    console.log("adding password");
    setWalletPassword(password);
  };

  return (
    <ConnectionsContext.Provider
      value={{
        wallet,
        daemon,
        walletFile,
        addWallet,
        walletPassword,
        addPassword,
      }}
    >
      {children}
    </ConnectionsContext.Provider>
  );
};

export default ConnectionsProvider;
