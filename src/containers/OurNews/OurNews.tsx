import Navbar from "../../components/shared/Navbar/Navbar";
import TickerComponent from "../../components/shared/Ticker/Ticker";

const OurNews = () => {
  return (
    <>
      <Navbar pageName={"ourNews"} backgroundColour={"#8A21DD"} />
      <TickerComponent data={["Test to see if this works", "story2"]} />
      <h1>Our News</h1>
    </>
  );
};

export default OurNews;
