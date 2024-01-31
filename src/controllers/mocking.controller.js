import { createRandomProducts } from "../utils/faker.js";

export const getFakerProducts = async (request, response) => {
  try {
    const products = await createRandomProducts(100);
    response.status(200).send(products);
  } catch (error) {
    response.status(500).send({ error: "Error al obtener productos" });
  }
};
