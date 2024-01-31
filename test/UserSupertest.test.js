import * as chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import "dotenv/config";

const expect = chai.expect;

const requester = supertest("http://localhost:4000");

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de usuarios en la ruta api/users", function () {
  before(() => {
    console.log("Arrancando el test");
  });

  beforeEach(() => {
    console.log("Arrancando el test");
  });

  it("Ruta: api/users metodo GET todos los usuarios", async () => {
    const { statusCode } = await requester.get("/api/users");

    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/users metodo GET usuario especifico", async () => {
    const id = "65b8a933bee91428236f606b";

    const { statusCode } = await requester.get(`/api/users/${id}`);

    expect(statusCode).to.be.equal(200);
  });
  it("Ruta: api/users metodo POST", async () => {
    const newUser = {
      first_name: "Santiago",
      password: "hola",
      age: 35,
      email: "santaasdi@zxqzqeqcazcxczxczxzzczzxcxc.com",
    };
    const { statusCode } = await requester.post("/api/users").send(newUser);

    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/users metodo PUT", async () => {
    const id = "65b8a933bee91428236f606b";
    const updateUser = {
      first_name: "Santiago",
      password: "hola",
      age: 35,
      email: "santi@vzzxczxxa.com",
    };
    const { ok } = await requester.put(`/api/users/${id}`).send(updateUser);

    expect(ok).to.be.ok;
  });

  it("Ruta: api/users metodo DELETE", async () => {
    const id = "65b8a933bee91428236f606b";

    const { ok } = await requester.delete(`/api/users/${id}`);

    expect(ok).to.have.ok;
  });
});
