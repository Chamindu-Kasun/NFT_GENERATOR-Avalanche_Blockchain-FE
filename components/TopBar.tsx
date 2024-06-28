import React from "react";
import Image from "next/image";
import Logo from "../public/images/Logo.png";


const TopBar: React.FC = () => {
  return (
    <div className="top-bar-section">
       <Image src={Logo} width={100} height={50} alt="Logo" />
       <button className="connect-wallet-button">Connect wallet</button>
    </div>
  );
};

export default TopBar;
