import * as chai from "chai";
import mongoose from "mongoose";
import "dotenv/config";
import supertest from "supertest";

const expect = chai.expect;

const requester = supertest("http://localhost:4000");

await mongoose.connect(process.env.MONGO_URL);

describe("test CRUD de las rutas /api/carts", function () {
  before(() => {
    console.log("Antes del test");
  });

  it("Ruta: api/carts metodo GET ", async () => {
    const { statusCode } = await requester.get("/api/carts");
    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/carts metodo GET por id", async () => {
    const id = "65af5a4de4b2021bfab67c3b";

    const { statusCode } = await requester.get(`/api/carts/${id}`);
    expect(statusCode).to.be.equal(200);
  });

  it("crear un cart mediante post ", async () => {
    const { statusCode } = await requester.post("/api/carts");
    expect(statusCode).to.be.equal(200);
  });

  //agregar un producto a un cart mediante POST
  it("Ruta: api/carts/:cid/products/:pid metodo POST ", async () => {
    const cartId = "65af453941b1df38c7200036";
    const productId = "65af5ae20b11abd611e472dc";
    const quantity = {
      quantity: 55,
    };
    const { statusCode } = await requester
      .post(`/api/carts/${cartId}/products/${productId}`)
      .send(quantity);

    expect(statusCode).to.be.equal(200);
  });

  //eliminar cart mediante DELETE en /carts/:id
  it("Ruta: api/carts metodo DELETE", async function () {
    const cartId = "65af453941b1df38c7200036";
    const { statusCode } = await requester.delete(`/api/carts/${cartId}`);
    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/carts/:cid/products/:pid metodo DELETE", async function () {
    const cartId = "65af453941b1df38c7200036";
    const productId = "65af5ae20b11abd611e472dc";
    const { statusCode } = await requester.delete(
      `/api/carts/${cartId}/products/${productId}`
    );
    expect(statusCode).to.be.equal(200);
  });
  it("Ruta: api/carts/:cid/purchase metodo POST", async function () {
    const cartId = "65af453941b1df38c7200036";

    const { statusCode } = await requester.post(
      `/api/carts/${cartId}/purchase`
    );
    expect(statusCode).to.be.equal(200);
  });
});
