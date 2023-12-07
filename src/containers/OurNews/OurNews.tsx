import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const OurNews = () => {
  return (
    <>
      <Navbar pageName={"ourNews"} backgroundColour={"#9c27b0"} />
      <NewsBody pageName={"RNA"} backgroundColour={"#f3e5f5" } />
    </>
  );
};

export default OurNews;
