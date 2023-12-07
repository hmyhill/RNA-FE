import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Sport = () => {
  return (
    <>
      <Navbar pageName={"sport"} backgroundColour={"#ff9800"} />
      <NewsBody pageName={"Sports"} newsStories={requestData} backgroundColour={"#fff3e0" } />
    </>
  );
};

export default Sport;
