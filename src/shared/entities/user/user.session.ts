"use client";
import { parseCookies } from "nookies";
import { COOKIE_NAME } from "@/shared/constants";

interface IUserReceived {
  user: {
    name: string;
    username: string;
    uuid: string;
    photo: string;
    email: string;
  };
  accessToken: string;
}

export const getUserSession = (): IUserReceived | null => {
  const cookie = parseCookies(undefined, COOKIE_NAME)[COOKIE_NAME];

  if (!cookie) {
    return null;
  }

  const userReceived = JSON.parse(cookie) as IUserReceived;

  return {
    accessToken: userReceived.accessToken,
    user: {
      ...userReceived.user,
      photo: userReceived.user?.photo
        ? userReceived.user.photo
        : "/img/no-image.jpeg",
    },
  } as IUserReceived;
};
