import { COOKIE_NAME } from "@/shared/constants";
import { api } from "@/shared/libs/axios";
import { setCookie } from "nookies";

type InputAuthenticationUserService = {
  email: string;
  password: string;
};

type OutputAuthenticationUserService = {
  error: boolean;
  message: string;
};

export const AuthenticationUserService = async ({
  email,
  password,
}: InputAuthenticationUserService): Promise<OutputAuthenticationUserService> => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    if (response.status < 400) {
      setCookie(undefined, COOKIE_NAME, JSON.stringify(response.data));

      return {
        error: false,
        message: "Usuário logado!!",
      };
    } else {
      return {
        error: true,
        message: "Erro ao logar usuário",
      };
    }
  } catch (error) {
    throw {
      error: true,
      message: "Erro no servidor",
    };
  }
};
