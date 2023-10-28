import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const World = () => {
  return (
    <>
      <Navbar pageName={"world"} backgroundColour={"#e90000"}/>
      <NewsBody pageName={"Global"} backgroundColour={"rgba(233, 0, 0, 0.25)" } />
    </>
  );
};

export default World;
