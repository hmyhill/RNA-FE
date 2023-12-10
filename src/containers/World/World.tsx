import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";
import Footer from "../../components/shared/Footer/Footer";
import React from "react";
import { httpGet } from "../../utils/api.utils";

const World = () => {
  const [requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getNews() {
      try {
        const news: { data?: { results?: any[] } } = await httpGet(
          `http://localhost:5000/news/world`
        );
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
      <Navbar pageName={"world"} backgroundColour={"#f44336"} />
      <NewsBody
        pageName={"Global"}
        newsStories={requestData}
        backgroundColour={"#ffebee"}
      />
      <Footer backgroundColour={"#ffebee"} />
    </>
  );
};

export default World;
