/*import React from "react";
import { TranslatorFunc } from "@/i18n";

// Create the context with an undefined initial value but assert the type
const TranslatorContext = React.createContext<TranslatorFunc | undefined>(undefined);

// TranslatorProvider props type definition
interface TranslatorProviderProps {
  children: React.ReactNode;
  translator: TranslatorFunc | undefined;
}

export const TranslatorProvider: React.FC<TranslatorProviderProps> = ({ children, translator }) => (
  <TranslatorContext.Provider value={translator}>
    {children}
  </TranslatorContext.Provider>
);

export const useTranslator = (): TranslatorFunc | undefined => {
  const context = React.useContext(TranslatorContext);
  return context;
};*/
