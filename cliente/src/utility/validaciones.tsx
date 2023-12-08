export const EmailValidacion = {
    required: "Este campo es requerido",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Ingresa un correo válido",
    },
};
  
export const PasswordValidacion = {
    required: "Este campo es requerido",
    minLength: {
        value: 8,
        message: "La contraseña debe tener al menos 8 caracteres.",
    },
};

export const inputRequeridoValidacion = {
    required: "Este campo es requerido",
};

export const inputTextRequeridoValidacion = {
    required: "Este campo es requerido",
    minLength: {
        value: 8,
        message: "El campo debe tener al menos 8 caracteres.",
    },
};