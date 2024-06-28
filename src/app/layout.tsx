import "../../styles/globals.css";

export const metadata = {
  title: "NFT GENERATOR",
  description: "Create your own NFTs with Avalanche Fuji Test Network",
};

import { WalletProvider } from "../../context/walletContext";

const Rootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <WalletProvider>
        <main>{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
};

export default Rootlayout;
