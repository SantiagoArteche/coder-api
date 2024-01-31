import * as chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";
import "dotenv/config";

const expect = chai.expect;

const requester = supertest("http://localhost:4000");

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de productos en la ruta api/products", function () {
  it("Ruta: api/products metodo GET todos los productos", async () => {
    const { statusCode } = await requester.get("/api/products");

    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/products metodo GET producto especifico", async () => {
    const id = "65b07fa43310dfccdbe6be2f";

    const { statusCode } = await requester.get(`/api/products/${id}`);

    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/products metodo POST", async () => {
    const newProduct = {
      title: "Brasil",
      description: "Segundo",
      price: 10,
      stock: 17,
      category: "Seleccion",
      code: "Br123AAAA",
    };
    const { statusCode } = await requester
      .post("/api/products")
      .send(newProduct);

    expect(statusCode).to.be.equal(201);
  });

  it("Ruta: api/products metodo PUT", async () => {
    const id = "65b07fa43310dfccdbe6be2f";
    const updateProduct = {
      title: "Brasil",
      description: "Segundo",
      price: 10,
      stock: 17,
      category: "Seleccion",
      code: "Br1234",
    };
    const { statusCode } = await requester
      .put(`/api/products/${id}`)
      .send(updateProduct);

    expect(statusCode).to.be.equal(200);
  });

  it("Ruta: api/products metodo DELETE", async () => {
    const id = "65b07fa43310dfccdbe6be2f";

    const { ok } = await requester.delete(`/api/products/${id}`);

    expect(ok).to.have.ok;
  });
});
