import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const World = () => {
  return (
    <>
      <Navbar pageName={"world"} backgroundColour={"#f44336"}/>
      <NewsBody pageName={"Global"} newsStories={requestData} backgroundColour={"#ffebee" } />
    </>
  );
};

export default World;
