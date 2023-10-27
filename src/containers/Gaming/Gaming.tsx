import Navbar from "../../components/shared/Navbar/Navbar";
import TickerComponent from "../../components/shared/Ticker/Ticker";

const Gaming = () => {
  return (
    <>
      <Navbar pageName={"gaming"} backgroundColour={"#0E7A0D"}/>
      <TickerComponent data={["Test to see if this works", "story2"]} />
      <h1>Gaming</h1>
    </>
  );
};

export default Gaming;
