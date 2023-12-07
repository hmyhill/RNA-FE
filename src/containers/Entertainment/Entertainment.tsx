import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";
import React from "react"
import { httpGet } from "../../utils/api.utils";

const Entertainment = () => {
  const[requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getNews() {
      try {
        const news: { data?: { results?: any[] } } = await httpGet(`/news/entertainment`);
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
      <Navbar pageName={"entertainment"} backgroundColour={"#4caf50"}/>
      <NewsBody pageName={"Entertainment"} newsStories={requestData} backgroundColour={"#e8f5e9" } />
    </>
  );
};

export default Entertainment;
