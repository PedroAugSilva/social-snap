import { api } from "@/shared/libs/axios";

type InputRegisterSellerService = {
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  cpf: string;
  cnpj: string;
  socialReason: string;
  enterpriseName: string;
  nacionality: string;
  telphone: string;
};
export type OutputRegisterClientService = {
  message: string;
  error: boolean;
};
export const RegisterSellerService = async (
  input: InputRegisterSellerService,
): Promise<OutputRegisterClientService> => {
  try {
    const response = await api.post("/register/seller", input);
    if (response.status < 400) {
      return {
        error: false,
        message: "Vendedor cadastrado!!",
      };
    } else {
      return {
        error: true,
        message: "Erro ao cadastrar vendedor",
      };
    }
  } catch (error) {
    throw {
      error: true,
      message: "Erro no servidor",
    };
  }
};
