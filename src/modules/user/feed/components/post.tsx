import { Heart } from "lucide-react";
import useSWR from "swr";
import colors from "tailwindcss/colors";

interface Props {
  data: {
    uuid: string;
    body: string;
    imageUrl: string;
    createdAt: string;
    likes: string;
    user: {
      photo?: string;
      name: string;
      username: string;
    };
    tags: {
      name: string;
    };
  };
}

export const Post = ({ data }: Props) => {
  const noImage = "/img/no-image.jpeg";

  return (
    <div className="cursor pointer group flex h-auto w-96 flex-col items-center rounded-lg transition-all hover:scale-105 ">
      <figure className="h-auto w-full rounded-lg group-hover:shadow-xl group-hover:shadow-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.imageUrl} alt="" className="h-full w-full  rounded-lg" />
      </figure>
      <div className="flex h-10 w-full items-center justify-between overflow-hidden px-2 transition-all group-hover:h-10 ">
        <div className="flex items-center gap-2">
          <figure className="h-7 w-7 overflow-hidden rounded-full ">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.user.photo ? data.user.photo : noImage}
              alt=""
              className="h-full w-full"
            />
          </figure>
          <span className="text-sm text-gray-600">@{data.user.username}</span>
        </div>
        <div className="invisible flex items-center gap-2 text-gray-600 group-hover:visible">
          <span>{data.likes}</span>
          <button className="group/like  grid place-items-center rounded-full border border-gray-700 p-1   group-hover:opacity-100 hover:border-red-500">
            <Heart
              size={18}
              className="text-gray-700  group-hover/like:fill-red-500 group-hover/like:text-red-500"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
