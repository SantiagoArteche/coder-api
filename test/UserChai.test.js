import mongoose from "mongoose";
import { usersModel } from "../src/models/users.models.js";
import * as chai from "chai";
import "dotenv/config";

const expect = chai.expect;

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

    // expect(Array.isArray(users)).to.be.ok;
    // expect(users).equal([]); array vacio
    expect(users).not.to.be.deep.equal([]);
  });

  it("Obtener un usuario mediante metodo get", async () => {
    const user = await usersModel.findById("65b88a0d183b144a1eb64f94");
    console.log(user);

    // assert.strictEqual(typeof user, "object");
    expect(user).to.have.property("_id");
  });
  it("Crear un usuario mediante metodo post", async () => {
    const newUser = {
      first_name: "Santiago",
      password: "hola",
      age: 35,
      email: "santi@zxqqeqca.com",
    };
    const createUser = await usersModel.create(newUser);

    expect(createUser).to.have.property("_id");
    // assert.strictEqual(typeof user, "object");
  });

  it("Actualizar usuario mediante metodo put", async () => {
    const updateUser = {
      first_name: "Santiago",
      password: "hola",
      age: 35,
      email: "santi@vzzxczxxa.com",
    };
    const update = await usersModel.findByIdAndUpdate(
      "65b88a0d183b144a1eb64f94",
      updateUser
    );

    expect(update).to.have.property("_id");
  });
  it("Borrar usuario mediante metodo delete", async () => {
    const deleteUser = await usersModel.findByIdAndDelete(
      "65b88a0d183b144a1eb64f94"
    );

    expect(deleteUser).to.have.ok;
  });
});
