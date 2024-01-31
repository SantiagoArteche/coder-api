import "dotenv/config";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  /*    
  1er paramatero objeto asociado al token 
        
  2do genero la clave privada para el cifrado
        
  3ro tiempo de expiracion
        */
  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: "12h",
  });
  console.log(token);
  return token;
};

generateToken({
  _id: "650f153f0233cf699c59c72d",
  first_name: "Santiago",
  last_name: "",
  age: "4443",
  email: "santiarteche@hotmail.comccccccc",
  password: "samto123",
  rol: "admin",
});

export const authToken = (request, response, next) => {
  const authHeader = request.headers.Authorization;

  if (!authHeader) {
    return response.status(401).send({ error: "Usuario no autenticado" });
  }

  const token =
    authHeader.split(" ")[1]; /*obtengo el token y descarto el bearer */

  jwt.sign(token, process.env.JWT_SECRET, (error, credential) => {
    if (error) {
      return response
        .status(403)
        .send({ error: "Usuario no autorizado, token invalido" });
    }
  });

  request.user = credential.user;
  next();
};
