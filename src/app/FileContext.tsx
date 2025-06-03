"use client"
import React, { createContext, useContext, useState } from "react";

const FileContext = createContext<{
  file: File[],
  setFile: (f: File[]) => void
}>({
  file: [],
  setFile: () => {}
});

export const FileProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [file, setFile] = useState<File[]>([]);
  return (
    <FileContext.Provider value={{ file, setFile }}>
      {children}
    </FileContext.Provider>
  );
};

export function useFile() {
  return useContext(FileContext);
}