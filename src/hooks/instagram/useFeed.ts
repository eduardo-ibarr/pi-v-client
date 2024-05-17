import axios from "axios";
import { useEffect, useState } from "react";

interface IFeedItem {
  id: string;
  media_type: "IMAGE" | "VIDEO";
  media_url: string;
  permalink: string;
}

export default function useFeed() {
  const [feedList, setFeedList] = useState<IFeedItem[]>([]);

  async function getInstaFeed() {
    const token = import.meta.env.VITE_INSTA_TOKEN;
    const fields = "media_url,media_type,permalink";
    const url = `https://graph.instagram.com/me/media?access_token=${token}&fields=${fields}`;

    try {
      const { data } = await axios.get(url);
      setFeedList(data.data);
    } catch (error) {
      console.error("Error fetching Instagram feed:", error);
    }
  }

  useEffect(() => {
    getInstaFeed();
  }, []);

  const mediaUrls = feedList.map((item) => item.media_url);

  return mediaUrls;
}
