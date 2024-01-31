import passport from "passport";

// Funcion general para retornar errores en las estrategias de passport

export const passportError = (strategy) => {
  return async (request, response, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error); // Que la funcion que me llame maneje como va a responder ante mi error
      }
      if (!user) {
        return response
          .status(401)
          .send({ error: info.messages ? info.messages : info.toString() });
      }

      request.user = user;
      next();
    })(request, response, next); //Esto es porque me llama un middleware a nivel de rutas
  };
};

export const authorization = (rol) => {
  return async (request, response, next) => {
    if (!request.user) {
      return response.status(401).send({ error: "User no autorizado" });
    }
    if (request.user.user.rol != rol) {
      return response
        .status(403)
        .send({ error: "Usuario no tiene los permisos necesarios" });
    }
    next();
  };
};
