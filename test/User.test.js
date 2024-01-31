import mongoose from "mongoose";
import { usersModel } from "../src/models/users.models.js";
import Assert from "assert";
import "dotenv/config";

const assert = Assert.strict;

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de usuarios en la ruta api/users", function () {
  before(() => {
    console.log("Arrancando el test");
  });

  beforeEach(() => {
    console.log("Arrancando el test");
  });

  it("Obtener todos los usuarios mediante metodo get", async () => {
    const users = await usersModel.find();
    console.log(users);

    assert.strictEqual(Array.isArray(users), true);
  });

  it("Obtener un usuario mediante metodo get", async () => {
    const user = await usersModel.findById("65b2cb604c63a52618d894f7");
    console.log(user);

    // assert.strictEqual(typeof user, "object");
    assert.ok(user._id);
  });
  it("Crear un usuario mediante metodo post", async () => {
    const newUser = {
      first_name: "Santiago",
      password: "hola",
      age: 35,
      email: "santi@zxca.com",
    };
    const createUser = await usersModel.create(newUser);

    assert.ok(createUser._id);
    // assert.strictEqual(typeof user, "object");
  });

  it("Actualizar usuario mediante metodo put", async () => {
    const updateUser = {
      first_name: "Santiago",
      password: "hola",
      age: 35,
      email: "santi@vzxa.com",
    };
    const update = await usersModel.findByIdAndUpdate(
      "65b2cb604c63a52618d894f7",
      updateUser
    );

    assert.ok(update._id);
  });
  it("Borrar usuario mediante metodo delete", async () => {
    const deleteUser = await usersModel.findByIdAndDelete(
      "65b2cb604c63a52618d894f7"
    );

    assert.strictEqual(typeof deleteUser, "object");
  });
});
