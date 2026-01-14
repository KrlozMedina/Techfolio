export const common = {
  actions: {
    submit: "Enviar",
    cancel: 'Cancelar',
    delete: "Eliminar",
    download: 'Descargar',
    retry: 'Reintentar',
  },

  fields: {
    name: "Nombre",
    email: "Correo electrónico",
    subject: "Asunto",
    password: 'Contraseña',
  },

  navigation: {
    home: 'Ir al inicio',
    back: 'Regresar',
  },
};

export type CommonLocale = typeof common;
