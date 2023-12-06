import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";
import React from "react"
import { httpGet } from "../../utils/api.utils";

const Tech = () => {
  const[requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getNews() {
      try {
        const news: { data?: { results?: any[] } } = await httpGet(`/news/tech`);
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
      <Navbar pageName={"tech"} backgroundColour={"#0400BD"}/>
      <NewsBody pageName={"Tech"} newsStories={requestData} backgroundColour={"rgba(4, 0, 189, 0.25)" } />
    </>
  );
};

export default Tech;
