"use client";
import { parseCookies } from "nookies";
import { COOKIE_NAME } from "@/shared/constants";

interface IUserReceived {
  user: {
    name: string;
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

  const userReceived = JSON.parse(cookie);

  return userReceived;
};
