"use client";

import * as React from "react";
import { setCookies } from "./config-cookies";
import { Cookies } from "./config-types";

export enum Booleanish {
  true = "true",
  false = "false"
}
export const dataBooleanish: `${Booleanish}`[] = Object.values(Booleanish);

type __T = "isOpenAside" | "theme";
type IntrinsicAppProvider = Record<__T, string | undefined> & {};

type UseAppContextProps = IntrinsicAppProvider & {};

interface ContextProps {
  theme: string;
  openAside?: `${Booleanish}`;
  setOpenAside?: (v: `${Booleanish}`) => void;
  setCookies(name: `${Cookies}` | (string & {}), value: string): Promise<void>;
}

const ctx = React.createContext<ContextProps | undefined>(undefined);

export const useAppContext = () => {
  const context = React.useContext(ctx);
  if (!context) {
    throw new Error("useAppContext must be used within an <AppProvider>");
  }
  return context;
};

export function useAppFuntions({
  isOpenAside = "true",
  theme = "system",
  ...others
}: UseAppContextProps) {
  const [openAside, setOpenAside] = React.useState<`${Booleanish}`>(
    isOpenAside as `${Booleanish}`
  );

  return {
    theme,
    openAside,
    setOpenAside,
    ...others
  };
}

interface AppProviderProps extends IntrinsicAppProvider {
  children: React.ReactNode;
}

export function AppProvider({ children, ...props }: AppProviderProps) {
  const app = useAppFuntions({ ...props });
  const value = { setCookies, ...app };
  return <ctx.Provider {...{ value }}>{children}</ctx.Provider>;
}
