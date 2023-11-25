"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { FileInput } from "./file-input";
import {
  DetailedHTMLProps,
  FormEventHandler,
  FormHTMLAttributes,
  useState,
} from "react";

export const Modal = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const data = new FormData(form);

    if (file) {
      data.append("file", file);
    }
  };

  return (
    <Dialog.Content className="fixed left-[50%] top-[50%] h-max translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4 ring-1 ring-gray-300">
      <header className="mb-6 flex items-center justify-between">
        <Dialog.Title>Nova postagem</Dialog.Title>
        <Dialog.Close className="rounded-md p-1 transition-all hover:bg-gray-100">
          <X />
        </Dialog.Close>
      </header>

      <form encType="multipart/form-data" onSubmit={handleChange} method="POST">
        <div className=" flex h-max w-full max-w-md flex-col items-center gap-4">
          <FileInput setFile={setFile} file={file} />

          <div className="flex w-full flex-col justify-between  ">
            <div className="mb-2 flex flex-col items-start ">
              <label className="text-sm text-gray-600">
                Legenda (opicional):
              </label>
              <textarea
                name="body"
                id=""
                rows={4}
                placeholder="Legenda..."
                className="block w-full resize-none rounded-lg border-2 border-gray-300 bg-white px-2 py-1 text-sm placeholder-gray-400 shadow-md data-[error=true]:border-red-500 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
              ></textarea>
            </div>
            <div className="flex flex-col items-start gap-1 py-1">
              <label className="text-sm text-gray-600">Tags (opicional):</label>
              <input
                name="tags"
                id=""
                type="text"
                placeholder="Legenda..."
                className="block w-full resize-none rounded-lg border-2 border-gray-300 bg-white p-2 text-sm placeholder-gray-400 shadow-md data-[error=true]:border-red-500 focus:border-gray-600 focus:bg-white focus:placeholder-gray-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
        <footer className="mt-4 flex h-9 w-full items-center justify-end gap-2">
          <Dialog.Close
            type="button"
            className="h-full rounded-lg bg-gray-300 px-3 text-gray-700 transition-all hover:bg-gray-400"
          >
            Cancelar
          </Dialog.Close>
          <button className="h-full rounded-lg bg-gray-800 px-3 text-gray-100 transition-all hover:bg-black">
            Postar
          </button>
        </footer>
      </form>
    </Dialog.Content>
  );
};
