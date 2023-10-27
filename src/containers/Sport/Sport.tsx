import Navbar from "../../components/shared/Navbar/Navbar";
import TickerComponent from "../../components/shared/Ticker/Ticker";

const Sport = () => {
  return (
    <>
      <Navbar pageName={"sport"} backgroundColour={"#FF7A00"} />
      <TickerComponent data={["Test to see if this works", "story2"]} />
      <h1>Sport</h1>
    </>
  );
};

export default Sport;
