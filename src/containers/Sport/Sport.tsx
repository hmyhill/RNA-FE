import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";
import Footer from "../../components/shared/Footer/Footer";
import React from "react"
import { httpGet } from "../../utils/api.utils";

const Sport = () => {
  const[requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getNews() {
      try {
        const news: { data?: { results?: any[] } } = await httpGet(`/news/sport`);
        return news.data.results || [];
      } catch (error) {
        console.error("Error fetching news:", error);
        return [];
      }
    }
  
    async function fetchData() {
      const data = await getNews();
      setRequestData(data);
    }
  
    fetchData();
  }, []);

  return (
    <>
      <Navbar pageName={"sport"} backgroundColour={"#ff9800"} />
      <NewsBody pageName={"Sports"} newsStories={requestData} backgroundColour={"#fff3e0" } />
      <Footer backgroundColour={"#fff3e0"} />
    </>
  );
};

export default Sport;
