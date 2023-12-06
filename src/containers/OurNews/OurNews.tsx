import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";

import React from "react"
import { httpGet } from "../../utils/api.utils";

const OurNews = () => {
  const[requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
      async function getNews() {
        try {
          const news: { data?: { results?: any[] } } = await httpGet(`/news/top`);
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
      <Navbar pageName={"ourNews"} backgroundColour={"#8A21DD"} />
      <NewsBody pageName={"RNA"} newsStories={requestData} backgroundColour={"rgba(138, 31, 221, 0.25)" } />
    </>
  );
};

export default OurNews;
