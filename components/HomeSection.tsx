"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Upload from "../public/images/Upload.png";
import NFT from "../public/images/NFT.png";
import { useWalletContext } from "../context/walletContext";
import NftForm from "./NftForm";

const HomeSection: React.FC = () => {
  const { walletAddress } = useWalletContext();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showCreateNFTForm, setShowCreateNFTForm] = useState<boolean>(false);
  const [showWalletNotConnectedMessage, setShowWalletNotConnectedMessage] =
    useState<string>("");

  const handleUploadClick = () => {
    if (!walletAddress) {
      setShowWalletNotConnectedMessage("You need to connect wallet first");
    } else {
      setShowWalletNotConnectedMessage("");
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreview(null);
    setShowCreateNFTForm(false);
  };

  const faucetUrl = "https://core.app/tools/testnet-faucet/?subnet=c&token=c";

  useEffect(() => {
    if (walletAddress)
      setShowWalletNotConnectedMessage(
        "Upload images from your computer that you need to convert to an NFT."
      );
  }, [walletAddress]);

  return (
    <>
      {!showCreateNFTForm ? (
        <div className="home-section">
          {preview ? (
            <div className="preview-image">
              <Image src={preview} width={300} height={200} alt="preview" />
            </div>
          ) : (
            <div>
              <Image src={NFT} width={300} height={200} alt="Logo" />
            </div>
          )}
          <div>
            {preview ? (
              <p>Convert this image to an NFT.</p>
            ) : !showWalletNotConnectedMessage ? (
              <p>
                Upload images from your computer that you need to convert to an
                NFT.
              </p>
            ) : (
              <p>{showWalletNotConnectedMessage}</p>
            )}
          </div>
          {preview ? (
            <div className="button-section-home">
              <button
                className="convert-button"
                onClick={() => setShowCreateNFTForm(true)}
              >
                Convert
              </button>
              <button className="close-button" onClick={handleClose}>
                Close
              </button>
            </div>
          ) : (
            <div>
              <Image
                src={Upload}
                width={200}
                height={100}
                alt="Upload Logo"
                onClick={handleUploadClick}
                style={{ cursor: "pointer" }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          )}
          {(walletAddress !== "" && !selectedFile) &&    (
            <a
              href={faucetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="faucet-button"
            >
              Get Test AVAX
            </a>
          )}
        </div>
      ) : (
        <div className="home-section-nft-form">
          <NftForm
            preview={preview}
            selectedFile={selectedFile}
            handleClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default HomeSection;
