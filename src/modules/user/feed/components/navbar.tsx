"use client";
import { getUserSession } from "@/shared/entities/user/user.session";
import { color } from "framer-motion";
import { Plus, Search } from "lucide-react";
import colors from "tailwindcss/colors";

export const Navbar = () => {
  const session = getUserSession();

  return (
    <div className="absolute grid w-full place-items-center p-2">
      <nav className="h-14 w-full rounded-lg bg-white p-2 shadow-sm">
        <ul className="flex h-full w-full items-center justify-between">
          <li className="flex h-full items-center gap-4 p-2">
            <figure className="h-10 w-10 overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="no profile image" src={session?.user.photo} />
            </figure>
            <div className="flex w-28 flex-col items-start justify-center truncate leading-tight">
              <span>{session?.user.name}</span>
              <span className="ml-0.5 text-xs text-gray-500">
                @{session?.user.username}
              </span>
            </div>
          </li>
          <li className="flex  items-center justify-between gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <input
              type="text"
              className="bg-gray-100 outline-none placeholder:text-gray-400"
              placeholder="Pesquisar..."
            />
            <button>
              <Search color={colors.gray[400]} />
            </button>
          </li>
          <li className="flex h-full items-center gap-3 px-2 text-sm text-gray-700">
            <span className="cursor-pointer hover:text-gray-500">Feed</span>
            <span className="cursor-pointer hover:text-gray-500">Curtidas</span>
            <button className="flex h-full items-center rounded-lg bg-gray-800 px-2 text-white hover:bg-black">
              <Plus size={16} className="mr-2" /> Nova postagem
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
