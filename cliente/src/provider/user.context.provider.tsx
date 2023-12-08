import React, { createContext, useContext, useState } from 'react';
import { UserContextType, UserProviderProps } from './type';

// Creación del contexto de usuario
export const UserContext = createContext<UserContextType | null>(null);

// Hook personalizado para acceder al contexto de usuario
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto de usuario
export const UserProvider = ({ children }:UserProviderProps) => {
  const [user, setUser] = useState<any>(null); // Estado del usuario

  // Función para establecer el usuario actual
  const setLoggedInUser = (userData: any) => {
    setUser(userData);
  };

  // Valor proporcionado por el contexto de usuario
  const value: UserContextType = {
    user,
    setLoggedInUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export default UserProvider