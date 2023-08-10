import "../../styles/globals.css";

export const metadata = {
  title: "NFT GENERATOR",
  description: "Create your own NFTs with Avalanche Fuji Test Network",
};

const Rootlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default Rootlayout;
