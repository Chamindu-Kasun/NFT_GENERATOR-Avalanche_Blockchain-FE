"use client";
import { createContext, useContext, useState, useEffect } from "react";
const AVAX_FUJI_CHAIN_ID = "0xa869";

type WalletContextProps = {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
};

interface CustomWindow extends Window {
  ethereum?: any;
}

// context with an initial value for the WalletContextProps
const WalletContext = createContext<WalletContextProps>({
  walletAddress: "",
  setWalletAddress: () => {},
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});

// provider
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  // connect wallet
  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      const customWindow = window as CustomWindow;
      if (!customWindow?.ethereum) return alert("Please install a wallet");

      try {
        const accounts = await customWindow.ethereum.request({
          method: "eth_requestAccounts",
        });

        const chainId = await customWindow.ethereum.request({
          method: "eth_chainId",
        });

        if (chainId !== AVAX_FUJI_CHAIN_ID) {
          try {
            await customWindow.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: AVAX_FUJI_CHAIN_ID }],
            });
          } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
              try {
                await customWindow.ethereum.request({
                  method: "wallet_addEthereumChain",
                  params: [
                    {
                      chainId: AVAX_FUJI_CHAIN_ID,
                      chainName: "Avalanche Fuji C-Chain",
                      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
                      blockExplorerUrls: [
                        "https://cchain.explorer.avax-test.network",
                      ],
                      nativeCurrency: {
                        name: "Avalanche",
                        symbol: "AVAX",
                        decimals: 18,
                      },
                    },
                  ],
                });
              } catch (addError) {
                console.error(addError);
              }
            } else {
              console.error(switchError);
            }
          }
        }
        // Set wallet address
        setWalletAddress(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // disconnect wallet
  const disconnectWallet = async () => {
    if (typeof window !== "undefined") {
      const customWindow = window as CustomWindow;
      if (customWindow?.ethereum) {
        try {
          // Set wallet address
          setWalletAddress("");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // value for the WalletContext
  const value = {
    walletAddress,
    setWalletAddress,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// useWalletContext hook
export function useWalletContext() {
  return useContext(WalletContext);
}
