import * as chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import "dotenv/config";

const expect = chai.expect;

const requester = supertest("http://localhost:4000");

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de sessions en la ruta api/session", function () {
  before(() => {
    console.log("Arrancando el test");
  });

  beforeEach(() => {
    console.log("Arrancando el test");
  });
  let cookie = {};

  it("Ruta: api/session/register metodo POST", async () => {
    const newUser = {
      first_name: "Santiago",
      last_name: "velez",
      password: "hola",
      email: "santaasdizxczxz@vzxzqac.com",
    };

    const { statusCode } = await requester
      .post("/api/session/register")
      .send(newUser);

    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/session/login metodo POST", async () => {
    const user = {
      email: "sanarte@hotmail.com",
      password: "jwt123",
    };

    const resultado = await requester.post("/api/session/login").send(user);
    console.log("resultado es este" + resultado.headers);
    const cookieResult = resultado.headers["set-cookie"][0];

    expect(cookieResult).to.be.ok;
    cookie = {
      name: cookieResult.split("=")[0],
      value: cookieResult.split("=")[1],
    };
    console.log(cookie);
    expect(cookie.name).to.be.ok.and.equal("jwtCookie");
    expect(cookie.value).to.be.ok;
  });

  it("Ruta: api/session/current metodo GET", async () => {
    const { _body } = await requester
      .get("/api/session/current")
      .set("Cookie", [`${cookie.name} = ${cookie.value}`]);
    console.log(_body.payload);
    expect(_body.payload.email).to.be.equal("santaasdi@vzxqc.com");
  });

  it("Ruta: api/session/logout metodo GET", async () => {
    const { ok } = await requester.get(`/api/session/logout`);

    expect(ok).to.be.ok;
  });
});
