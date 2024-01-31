import { usersModel } from "../models/users.models.js";
import { sendRecoveryMail } from "../config/nodemailer.js";

import crypto from "crypto";
const recoveryLinks = {};
export const getUsers = async (request, response) => {
  try {
    const users = await usersModel.find();
    response.status(200).send({ res: "OK", mes: users });
  } catch (error) {
    response.status(404).send({ res: "ERROR", mes: error });
  }
};

export const getUserById = async (request, response) => {
  const { uid } = request.params;
  try {
    const user = await usersModel.findById(uid);
    console.log(user);
    if (user) response.status(200).send(user);
  } catch (error) {
    response.status(400).send({ res: "ERROR", mes: { error } });
  }
};

export const createUser = async (request, response) => {
  const { first_name, last_name, password, age, email } = request.body;

  try {
    const userCreate = await usersModel.create({
      first_name,
      last_name,
      password,
      age,
      email,
    });

    response.status(200).send({ res: "OK", mes: userCreate });
  } catch (error) {
    response.status(404).send({ res: "ERROR", mes: error });
  }
};

export const deleteUser = async (request, response) => {
  const { uid } = request.params;
  try {
    const deleteUser = await usersModel.findByIdAndDelete(uid);

    if (deleteUser)
      response
        .status(200)
        .send({ res: "Usuario borrado de manera exitosa", mes: deleteUser });
    else response.status(400).send("Usuario no encontrado");
  } catch (error) {
    response.status(400).send({ res: "ERROR", mes: { error } });
  }
};

export const updateUser = async (request, response) => {
  const { uid } = request.params;
  const { first_name, last_name, password, age, email } = request.body;
  try {
    const user = await usersModel.findByIdAndUpdate(uid, {
      first_name,
      last_name,
      password,
      age,
      email,
    });

    if (user)
      response.status(200).send({ res: "Usuario actualizado", mes: user });
  } catch (error) {
    response.status(400).send({ res: "ERROR", mes: { error } });
  }
};
export const passwordRecovery = async (request, response) => {
  const { email } = request.body;
  console.log(email);
  try {
    const token = crypto.randomBytes(20).toString("hex");

    recoveryLinks[token] = { email: email, timestamp: Date.now() };

    const recoveryLink = `http://localhost:4000/api/users/reset-password/${token}`;

    sendRecoveryMail(email, recoveryLink);

    response.status(200).send("Correo de recuperacion enviado");
  } catch (error) {
    response.status(500).send(`Error al enviar el mail ${error}`);
  }
};
export const resetPassword = async (request, response) => {
  const { token } = request.params;
  const { newPassword, newPasswordB } = request.body;
  try {
    const linkData = recoveryLinks[token];
    if (linkData && Date.now() - linkData.timestamp <= 3600000) {
      console.log(newPassword, "    ", newPasswordB);
      if (newPassword == newPasswordB) {
        const { email } = linkData;
        console.log(email);
        console.log(token);

        delete recoveryLinks[token];
        response.status(200).send("Contrasena modificada correctamente");
      } else {
        response.status(400).send("Las contraseñas deben ser identicas");
      }
    } else {
      response.status(400).send("Token invalido o expirado");
    }
  } catch (error) {
    response.status(500).send(`Error al modificar contraseña ${error}`);
  }
};

export const uploadUserDocuments = async (request, response) => {
  const { uid } = request.params;
  const files = request.files;
  console.log(files);
  if (!files || files.length === 0)
    return response.status(400).send("No se subieron archivos");

  try {
    const user = await usersModel.findById(uid);
    console.log(user);
    if (!user) return response.status(404).send("Usuario no encontrado");

    const updatedDocuments = files.map((file) => ({
      name: file.originalname,
      reference: file.path,
    }));

    user.documents.push(...updatedDocuments);
    await user.save();
    response.status(200).send("Imagen cargada");
  } catch (error) {
    response.status(500).send({ error: error });
  }
};
