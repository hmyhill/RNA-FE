import Navbar from "../../components/shared/Navbar/Navbar";
import TickerComponent from "../../components/shared/Ticker/Ticker";

const Tech = () => {
  return (
    <>
      <Navbar pageName={"tech"} backgroundColour={"#0400BD"}/>
      <TickerComponent data={["Test to see if this works", "story2"]} />
      <h1>Tech</h1>
    </>
  );
};

export default Tech;
