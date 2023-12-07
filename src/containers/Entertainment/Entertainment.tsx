import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Entertainment = () => {
  return (
    <>
      <Navbar pageName={"entertainment"} backgroundColour={"#4caf50"}/>
      <NewsBody pageName={"Entertainment"} newsStories={requestData} backgroundColour={"#e8f5e9" } />
    </>
  );
};

export default Entertainment;
