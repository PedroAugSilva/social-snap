"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginFormType, LoginSchema } from "@/shared/validations/login";
import { AuthenticationUserService } from "@/shared/services/users/auth";
import { useRouter } from "next/navigation";

export const LoginModule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
  });

  const router = useRouter();

  const handleAuthenticate: SubmitHandler<LoginFormType> = (data) => {
    AuthenticationUserService(data).then((response) => {
      router.push("/feed");
    });
  };

  return (
    <main className="grid h-screen place-items-center">
      <section className="flex flex-col items-center">
        <h1 className="text-2xl">SocialSnap</h1>
        <p className="mb-3 w-80 text-center text-gray-700">
          Sua rede-social de imagens
        </p>

        <form onSubmit={handleSubmit(handleAuthenticate)}>
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">Email</span>
            <input
              placeholder="Insira seu email..."
              type="email"
              data-error={!!errors.email}
              {...register("email")}
              className="text-md block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-md data-[error=true]:border-red-500 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
            />
            {errors.email && (
              <span className="px-1 text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">Senha</span>
            <input
              placeholder="Insira sua senha..."
              type="password"
              data-error={!!errors.password}
              {...register("password")}
              className="text-md block w-full rounded-lg border-2 border-gray-300 bg-white px-3 py-2 placeholder-gray-400 shadow-md data-[error=true]:border-red-500 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
            />
            {errors.password && (
              <span className="px-1 text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <button className="mt-3 block w-full rounded-lg bg-gray-800 px-6 py-2 text-lg font-semibold text-white shadow-xl transition-all hover:bg-black hover:text-white">
            Entrar
          </button>
        </form>
      </section>
    </main>
  );
};
