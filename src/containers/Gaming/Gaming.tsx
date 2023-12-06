import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Gaming = () => {
  return (
    <>
      <Navbar pageName={"gaming"} backgroundColour={"#4caf50"}/>
      <NewsBody pageName={"Gaming"} backgroundColour={"#e8f5e9" } />
    </>
  );
};

export default Gaming;
