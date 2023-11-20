"use client";
import useSWR from "swr";
import { Post } from "./components/post";
import { api } from "@/shared/libs/axios";

interface Posts {
  uuid: string;
  body: string;
  imageUrl: string;
  createdAt: string;
  likes: string;
  user: {
    photo: string;
    name: string;
    username: string;
  };
  tags: {
    name: string;
  };
}

export const FeedModule = () => {
  const { data } = useSWR("/posts", async () => {
    const response = await api.get("/posts");
    return response.data as Posts[];
  });

  return (
    <section className="flex flex-col items-center px-2 pt-20">
      <main>{data?.map((item) => <Post data={item} key={item.uuid} />)}</main>
    </section>
  );
};
