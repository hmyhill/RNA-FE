import Navbar from "../../components/shared/Navbar/Navbar";
import NewsBody from "../../components/shared/Body/NewsBody";
import Footer from "../../components/shared/Footer/Footer";
import React from "react";
import { httpGet } from "../../utils/api.utils";

const OurNews = () => {
  const [requestData, setRequestData] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function getNews() {
      try {
        const news: { data?: { results?: any[] } } = await httpGet(
          `api/return_news_articles/`
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
      <Navbar pageName={"ourNews"} backgroundColour={"#9c27b0"} />
      <NewsBody
        pageName={"RNA"}
        newsStories={requestData}
        backgroundColour={"#f3e5f5"}
      />
      <Footer backgroundColour={"#f3e5f5"} />
    </>
  );
};

export default OurNews;
