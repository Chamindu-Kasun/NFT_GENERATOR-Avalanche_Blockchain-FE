"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../public/images/Logo.png";
import { useWalletContext } from "../context/walletContext";

const TopBar: React.FC = () => {
  const { walletAddress, connectWallet, disconnectWallet } = useWalletContext();
  const [isHovered, setIsHovered] = useState(false);

  const handleWalletAddressConnect = () => {
    if (walletAddress !== "") {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}....${address.slice(-4)}`;
  };

  return (
    <div className="top-bar-section">
      <Image src={Logo} width={100} height={50} alt="Logo" />
      <button
        className="connect-wallet-button"
        onClick={handleWalletAddressConnect}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {walletAddress === "" ? "Connect wallet" : isHovered?"Disonnect wallet":shortenAddress(walletAddress) }
      </button>
    </div>
  );
};

export default TopBar;
