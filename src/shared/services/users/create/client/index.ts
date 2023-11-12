import { api } from "@/shared/libs/axios";

type InputCreateUserService = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type OutputCreateClientServer = {
  message: string;
  error: boolean;
};

export const CreateClientService = async (
  input: InputCreateUserService,
): Promise<OutputCreateClientServer> => {
  try {
    const response = await api.post("/register", input);
    if (response.status < 400) {
      return {
        error: false,
        message: "Usuário criado!!",
      };
    } else {
      return {
        error: true,
        message: "Erro ao cadastrar usuário",
      };
    }
  } catch (error) {
    throw {
      error: true,
      message: "Erro no servidor",
    };
  }
};
