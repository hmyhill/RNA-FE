import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Tech = () => {
  return (
    <>
      <Navbar pageName={"tech"} backgroundColour={"#0400BD"}/>
      <NewsBody pageName={"Tech"} backgroundColour={"rgba(4, 0, 189, 0.25)" } />
    </>
  );
};

export default Tech;
