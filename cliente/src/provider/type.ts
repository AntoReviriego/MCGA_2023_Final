import { ReactNode } from "react";

// Definición del tipo de datos del contexto de usuario
export type UserContextType = {
    user: any; // Tipo de datos para el usuario, ajusta esto según tu estructura de usuario
    setLoggedInUser: React.Dispatch<React.SetStateAction<any>>; // Función para actualizar el usuario
};
  
export type UserProviderProps = {
    children: ReactNode;
};