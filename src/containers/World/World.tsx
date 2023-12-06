import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";
import React from "react"
import { httpGet } from "../../utils/api.utils";

const World = () => {
  const[requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getNews() {
      try {
        const news: { data?: { results?: any[] } } = await httpGet(`/news/world`);
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
      <Navbar pageName={"world"} backgroundColour={"#e90000"}/>
      <NewsBody pageName={"Global"} newsStories={requestData} backgroundColour={"rgba(233, 0, 0, 0.25)" } />
    </>
  );
};

export default World;
