"use client";
import {
  RegisterClientFormType,
  RegisterClientSchema,
} from "@/shared/validations/register";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import {
  CreateClientService,
  OutputCreateClientServer,
} from "@/shared/services/users/create/client";
import { useRouter } from "next/navigation";
import { Toast } from "@/shared/components/Toast";

export const RegisterModule = () => {
  const {
    register,
    handleSubmit: onSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterClientFormType>({
    resolver: zodResolver(RegisterClientSchema),
  });

  const [open, setOpen] = useState<boolean>(false);

  const [serverError, setServerError] = useState<string | null>();
  const router = useRouter();

  const handleSubmit: SubmitHandler<RegisterClientFormType> = async (data) => {
    const dataRequest: Omit<typeof data, "confirmPassword"> = {
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      password: data.password,
    };

    await CreateClientService(dataRequest)
      .then((response) => {
        if (response.error) {
          setServerError(response.message);
          return;
        } else {
          reset();
          router.push("/login");
          setOpen(true);
          console.log(response.message);
          return;
        }
      })
      .catch((response: OutputCreateClientServer) => {
        setServerError(response.message);
      });
  };

  return (
    <div className="container relative mx-auto flex h-screen max-w-full items-start justify-center px-6 max-md:py-16 md:py-24">
      <div className="absolute ml-28 mt-20 rotate-45 blur-xl">
        <div className="absolute top-48 z-[1] h-80 w-80 rounded-full bg-gray-300" />
        <div className="  h-80 w-80 rounded-full bg-slate-300" />
      </div>
      <div className="mx-auto max-w-sm px-6">
        <div className="relative flex flex-wrap">
          <div className="relative w-full">
            <div className="md:mt-6">
              <div className="text-center font-semibold text-black">
                E-commerce
              </div>
              <div className="font-base text-center text-black">
                Precisa fazer compras de forma mais fácil? Entre para nosso
                ecommerce
              </div>
              <form className="mt-8" onSubmit={onSubmit(handleSubmit)}>
                <div className="mx-auto max-w-lg ">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">Nome</span>
                      <input
                        placeholder="Nome..."
                        type="text"
                        {...register("firstname")}
                        className="text-md block w-full rounded-lg border-2 border-gray-300
                      bg-white px-3 py-2 placeholder-gray-400 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                    <div className="py-1">
                      <span className="px-1 text-sm text-gray-600">
                        Sobrenome
                      </span>
                      <input
                        placeholder="Sobrenome..."
                        type="text"
                        {...register("lastname")}
                        className="text-md block w-full rounded-lg border-2 border-gray-300
                      bg-white px-3 py-2 placeholder-gray-400 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Email</span>
                    <input
                      placeholder="Insira seu email..."
                      type="email"
                      {...register("email")}
                      className="text-md block w-full rounded-lg border-2 border-gray-300
                    bg-white px-3 py-2 placeholder-gray-400 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
                    />
                  </div>

                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">Senha</span>
                    <input
                      placeholder="Insira sua senha..."
                      type="password"
                      {...register("password")}
                      className="text-md block w-full rounded-lg border-2 border-gray-300
                    bg-white px-3 py-2 placeholder-gray-400 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="py-1">
                    <span className="px-1 text-sm text-gray-600">
                      Confirmar senha
                    </span>
                    <input
                      placeholder="Confirme sua senha..."
                      type="password"
                      {...register("confirmPassword")}
                      className="text-md block w-full rounded-lg border-2 border-gray-300
                    bg-white px-3 py-2 placeholder-gray-400 shadow-md focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
                    />
                  </div>
                  <div className="ml-4 mt-3 flex justify-start p-1"></div>

                  <button
                    className="mt-3 block w-full
                rounded-lg bg-gray-800 px-6 py-3
                text-lg font-semibold text-white shadow-xl hover:bg-black hover:text-white"
                  >
                    Registrar
                  </button>
                </div>

                <ul className="mt-4 flex flex-col gap-2">
                  {errors.email && (
                    <li className="group flex flex-row items-center gap-2">
                      <div className="grid place-items-center  rounded-full bg-pink-600 p-0.5 text-white">
                        <X size={18} />
                      </div>
                      <span className="text-md block text-pink-600">
                        {errors.email.message}
                      </span>
                    </li>
                  )}
                  {errors.password && (
                    <li className="group flex flex-row items-center gap-2">
                      <div className="grid place-items-center  rounded-full bg-pink-600 p-0.5 text-white">
                        <X size={18} />
                      </div>
                      <span className="text-md block text-pink-600">
                        {errors.password.message}
                      </span>
                    </li>
                  )}
                  {errors.confirmPassword && (
                    <li className="group flex flex-row items-center gap-2">
                      <div className="grid place-items-center  rounded-full bg-pink-600 p-0.5 text-white">
                        <X size={18} />
                      </div>
                      <span className="text-md block text-pink-600">
                        {errors.confirmPassword.message}
                      </span>
                    </li>
                  )}
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toast message="Usuário cadastrado!!" open={open} setOpen={setOpen} />
    </div>
  );
};
