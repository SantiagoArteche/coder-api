import { faker } from "@faker-js/faker";

const modelProduct = async () => {
  return {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    stock: faker.number.binary(),
    category: faker.commerce.productAdjective(),
    status: faker.datatype.boolean(),
    code: faker.location.countryCode(),
    thumbnails: [],
  };
};

export const createRandomProducts = async (cantProducts) => {
  const products = [];

  for (let i = 0; i < cantProducts; i++) {
    products.push(await modelProduct());
  }

  return products;
};

const erroresComunes = {
  missing_field: "Falta un campo obligatorio en la solicitud.",
  invalid_data: "Los datos proporcionados son inválidos.",
  product_not_found: "El producto no se encontró en la base de datos.",
  // Agregar más errores según sea necesario
};
