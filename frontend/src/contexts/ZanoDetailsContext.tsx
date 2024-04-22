import { createContext, useEffect, useState } from "react";

// go
import {} from "../../wailsjs/go/main/App";

interface Props {
  children: React.ReactNode;
}

export type ZanoDetailsContextState = {
  zanoAddress: string;
  balance: string;
  unlockedBalance: string;
};

const ZanoDetailsDefaultValues: ZanoDetailsContextState = {
  zanoAddress: "Zxblabla..",
  balance: "",
  unlockedBalance: "",
};

export const ZanoDetailsContext = createContext<ZanoDetailsContextState>(
  ZanoDetailsDefaultValues
);

export const ZanoDetailsProvider = ({ children }: Props) => {
  const [zanoAddress, setZanoAddress] = useState<string>(
    ZanoDetailsDefaultValues.zanoAddress
  );
  const [balance, setBalance] = useState<string>(
    ZanoDetailsDefaultValues.balance
  );
  const [unlockedBalance, setUnlockedBalance] = useState<string>(
    ZanoDetailsDefaultValues.unlockedBalance
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setZanoAddress("");
      setBalance("");
      setUnlockedBalance("");
    }, 2000);
    return () => clearInterval(interval);
  });

  return (
    <ZanoDetailsContext.Provider
      value={{
        zanoAddress,
        balance,
        unlockedBalance,
      }}
    >
      {children}
    </ZanoDetailsContext.Provider>
  );
};

export default ZanoDetailsProvider;
