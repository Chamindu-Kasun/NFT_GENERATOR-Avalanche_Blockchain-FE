import { use, useState } from "react";
import Image from "next/image";
import uploadFileToIPFS from "../services/UploadToIPFS";

type NftFormProps = {
  preview: string | null;
  selectedFile: File | null;
  handleClose : () => void;
};

const NftForm: React.FC<NftFormProps> = (props) => {
  const { preview, selectedFile, handleClose } = props;
  const [isNotUploadedToIPFS, setNotIsUplodedToIPFS] = useState<boolean>(true);
  const [formInput, updateFormInput] = useState({ name: "", description: "" });
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true);
      const path = await uploadFileToIPFS(selectedFile);
      if (path) {
        setIpfsHash(path);
        setNotIsUplodedToIPFS(false);
      } else {
        setIpfsHash("");
        setNotIsUplodedToIPFS(true);
      }
      setIsUploading(false);
    }
  };

  return (
    <div className="nft-form">
      <div className="preview-image">
        <Image
          src={preview ? preview : ""}
          width={300}
          height={200}
          alt="preview"
        />
      </div>
      <div>
        <button className="upload-to-ipfs-button" onClick={handleUpload}>{isUploading?"Uploading..":isNotUploadedToIPFS?"Upload to IPFS":"Uploaded"}</button>
      </div>
      <input
        placeholder={isNotUploadedToIPFS ? "IPSF Url" : ipfsHash?ipfsHash:"IPSF Url"}
        className="inputField"
        disabled={true}
      />
      {isNotUploadedToIPFS && <p className="upload-image-text">Upload image to IPFS first</p>}
      <input
        placeholder="Asset Name"
        className="inputField"
        onChange={(e) =>
          updateFormInput({ ...formInput, name: e.target.value })
        }
        disabled={isNotUploadedToIPFS}
      />
      <textarea
        placeholder="Asset Description"
        className="inputField"
        onChange={(e) =>
          updateFormInput({ ...formInput, description: e.target.value })
        }
        disabled={isNotUploadedToIPFS}
      />
      <div className="button-section">
        <button className="generate-nft-button" disabled={isNotUploadedToIPFS}>Generate NFT</button>
        <button className="cancel-button" onClick={handleClose}>Cancel</button>
      </div>
    </div>
  );
};

export default NftForm;
