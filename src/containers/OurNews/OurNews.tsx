import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

const OurNews = () => {
  return (
    <>
      <Navbar pageName={"ourNews"} backgroundColour={"#8A21DD"} />
      <NewsBody pageName={"RNA"} backgroundColour={"rgba(138, 31, 221, 0.25)" } />
    </>
  );
};

export default OurNews;
