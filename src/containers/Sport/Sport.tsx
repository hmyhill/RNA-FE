import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Sport = () => {
  return (
    <>
      <Navbar pageName={"sport"} backgroundColour={"#FF7A00"} />
      <NewsBody pageName={"Sports"} backgroundColour={"rgba(255, 122, 0, 0.25)" } />
    </>
  );
};

export default Sport;
