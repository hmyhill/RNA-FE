import Navbar from "../../components/shared/Navbar/Navbar";
import TickerComponent from "../../components/shared/Ticker/Ticker";

const World = () => {
  return (
    <>
      <Navbar pageName={"world"} backgroundColour={"#e90000"}/>
      <TickerComponent data={["Test to see if this works", "story2"]} />
      <h1>WORLD</h1>
    </>
  );
};

export default World;
