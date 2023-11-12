"use client";
import axios from "axios";
import { getUserSession } from "../entities/user/user.session";
const session = getUserSession();

export const api = axios.create({
  baseURL: "http://localhost:8000",

  headers: {
    Authorization: `Bearer ${session ? session.accessToken : ""}`,
  },
});
