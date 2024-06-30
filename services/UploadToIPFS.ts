import axios from "axios";

const uploadFileToIPFS = async (fileImg: File) => {
  try {
    const formData = new FormData();
    formData.append("file", fileImg);

    const resFile = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      data: formData,
      headers: {
        pinata_api_key: `${process.env.PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.PINATA_SECRET_API_KEY}`,
        "Content-Type": "multipart/form-data",
      },
    });

    const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
    return ImgHash;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default uploadFileToIPFS;
