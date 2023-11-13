import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Gaming = () => {
  return (
    <>
      <Navbar pageName={"gaming"} backgroundColour={"#0E7A0D"}/>
      <NewsBody pageName={"Gaming"} backgroundColour={"rgba(14, 122, 13, 0.25)" } />
    </>
  );
};

export default Gaming;
