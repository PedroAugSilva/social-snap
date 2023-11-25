"use client";

import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { DropzoneState, useDropzone } from "react-dropzone";
import * as Dropdown from "@radix-ui/react-dropdown-menu";

interface InputProps {
  dropzone: DropzoneState;
}

interface HasFileProps {
  file?: File;
  removeFile: () => void;
}

interface FileInputProps {
  setFile: Dispatch<SetStateAction<File | null>>;
  file: File | null;
}

export const FileInput = ({ file, setFile }: FileInputProps) => {
  const removeFile = useCallback(() => {
    setFile(null);
  }, [file]);

  const onDrop = useCallback((files: File[]) => {
    setFile(files[0]);
  }, []);

  const dropzone = useDropzone({
    onDrop,
    accept: {
      "application/image": [".png"],
    },
  });

  if (file) return <HasFile file={file} removeFile={removeFile} />;

  return <Input dropzone={dropzone} />;
};

const Input = ({ dropzone }: InputProps) => {
  const { getRootProps, getInputProps, isDragActive } = dropzone;

  return (
    <div
      {...getRootProps()}
      className={`group/input h-52 w-96 max-w-md rounded-lg border-2 border-dashed border-gray-200 bg-white p-2 transition-all hover:border-gray-500
      ${isDragActive ? "border-emerald-500" : "border-gray-600"}`}
    >
      <label htmlFor="dropzone-file" className="h-full w-full cursor-pointer">
        <div className="flex h-full w-full flex-col items-center justify-center pb-6 pt-5">
          {isDragActive ? (
            <p className="text-lg font-bold text-emerald-400">
              Solte para adicionar
            </p>
          ) : (
            <>
              <p className="mb-2 text-center text-lg text-gray-400 group-hover/input:text-gray-800">
                <span className="font-bold">Clique para enviar</span> ou arraste
                até aqui a Imagem
              </p>
            </>
          )}
        </div>
      </label>
      <input {...getInputProps()} className="hidden" />
    </div>
  );
};

const HasFile = ({ file, removeFile }: HasFileProps) => {
  const preview = URL.createObjectURL(file!);

  return (
    <div className="flex h-full w-full max-w-md flex-col items-center justify-center gap-2 rounded-lg">
      <figure className="group relative">
        <Dropdown.Root>
          <Dropdown.Trigger className="absolute inset-0 grid h-full w-full place-items-center rounded-lg text-gray-600 opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 data-[state=open]:opacity-100">
            <Trash2 />
          </Dropdown.Trigger>
          <Dropdown.Portal>
            <Dropdown.Content className="mb-20 rounded-lg border border-gray-300 bg-white p-2 shadow-md">
              <Dropdown.Arrow className="fill-gray-300" />
              <Dropdown.Item asChild>
                <button
                  className="flex w-36 items-center rounded-lg px-2 py-1 text-start text-red-500 hover:bg-red-500/20"
                  onClick={removeFile}
                >
                  <Trash2 size={16} className="mr-1.5" />
                  Remover
                </button>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Portal>
        </Dropdown.Root>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={preview} alt="" className="h-auto w-full rounded-lg" />
      </figure>
    </div>
  );
};
