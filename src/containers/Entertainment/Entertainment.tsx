import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Entertainment = () => {
  return (
    <>
      <Navbar pageName={"entertainment"} backgroundColour={"#0E7A0D"}/>
      <NewsBody pageName={"Entertainment"} backgroundColour={"rgba(14, 122, 13, 0.25)" } />
    </>
  );
};

export default Entertainment;
