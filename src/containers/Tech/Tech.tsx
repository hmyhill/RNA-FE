import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const Tech = () => {
  return (
    <>
      <Navbar pageName={"tech"} backgroundColour={"#009688"}/>
      <NewsBody pageName={"Tech"} newsStories={requestData} backgroundColour={"#e0f2f1" } />
    </>
  );
};

export default Tech;
