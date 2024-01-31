import { sendInactiveUserEmail } from "../config/nodemailer.js";
import { usersModel } from "../models/users.models.js";
import { generateToken } from "../utils/jwt.js";

export const currentSession = (request, response) => {
  response.send(request.user);
};
export const github = async (request, response) => {
  response.status(200).send({ mes: "Usuario registrado" });
};
export const githubCallback = async (request, response) => {
  request.session.user = request.user;
  response.status(200).send({ mes: "Usuario logeado" });
};

export const register = async (request, response) => {
  try {
    if (!request.user) {
      return response.status(400).send({ mes: "Usuario ya existente" });
    }

    response.status(200).send({ mes: "Usuario registrado" });
  } catch (error) {
    response.status(500).send({ mes: `Error al registrar usuario ${error}` });
  }
};

export const login = async (request, response) => {
  try {
    if (!request.user) {
      return response.status(401).send({ mes: "Usuario invalido" });
    }

    // request.session.user = {
    //   first_name: request.user.first_name,
    //   last_name: request.user.last_name,
    //   age: request.user.age,
    //   email: request.user.email,
    // };

    const token = generateToken(request.user);

    response.status(200).send({ token });
  } catch (error) {
    response.status(500).send({ mes: `Error al iniciar sesion ${error}` });
  }
};

export const testJWT = (request, response) => {
  response.send(request.user);
};

export const logout = async (request, response) => {
  console.log(request.user);

  if (request.session) {
    request.session.destroy();
  }

  response.clearCookie("jwtCookie");
  response.status(200).send({ mes: "usuario deslogeado" });
};

export const deleteInactiveSessions = async (request, res) => {
  try {
    const inactiveUsers = await usersModel.find({
      last_connection: { $lt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    });
    console.log(inactiveUsers);
    await Promise.all(
      inactiveUsers.map(async (user) => {
        if (user.email) {
          await new Promise((resolve) => {
            request.session.destroy(user.email, (err) => {
              if (err) {
                console.error("Error destruyendo la sesion", err);
              }
              resolve();
            });
          });
        }
        sendInactiveUserEmail(user.email);
      })
    );

    res.status(200).send({ respuesta: "OK", message: "Sesion caducada" });
  } catch {
    res
      .status(500)
      .send({ respuesta: "Error", message: "No se pudo cerrar la sesión" });
  }
};
