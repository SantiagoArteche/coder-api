import { productModel } from "../models/products.models.js";

export const getProducts = async (request, response) => {
  const { limit, page, filter, sort } = request.query;

  const pag = page ? page : 1;
  const lim = limit ? limit : 10;
  const ord = sort == "asc" ? 1 : -1;

  try {
    const prods = await productModel.paginate(
      { filter: filter },
      { limit: lim, page: pag, sort: { price: ord } }
    );
    if (prods) {
      return response.status(200).send(prods);
    }

    response.status(404).send("Productos no encontrados");
  } catch (error) {
    response
      .status(500)
      .send({ error: `Error en consultar productos ${error}` });
  }
};

export const getProductById = async (request, response) => {
  const { pid } = request.params;

  try {
    const prods = await productModel.findById(pid);
    if (prods) {
      return response.status(200).send(prods);
    }

    response.status(404).send("Producto no encontrados");
  } catch (error) {
    response
      .status(500)
      .send({ error: `Error en consultar producto ${error}` });
  }
};

export const postProduct = async (request, response) => {
  const { title, description, code, price, stock, category } = request.body;

  try {
    const prod = await productModel.create({
      title,
      description,
      code,
      price,
      stock,
      category,
    });

    if (prod) {
      return response.status(201).send(prod);
    }

    response.status(400).send({ error: "Error en crear producto" });
  } catch (error) {
    if (error.code === 11000) {
      return response
        .status(400)
        .send({ error: `Producto ya creado con llave duplicada` });
    }
    response
      .status(500)
      .send({ error: `Error en consultar producto ${error}` });
  }
};

export const putProduct = async (request, response) => {
  const { pid } = request.params;
  const { title, description, code, price, stock, category } = request.body;

  try {
    const prod = await productModel.findByIdAndUpdate(pid, {
      title,
      description,
      code,
      price,
      stock,
      category,
    });
    if (prod) {
      return response.status(200).send(prod);
    }
    response.status(404).send({ error: "Producto no encontrado" });
  } catch (error) {
    response
      .status(500)
      .send({ error: `Error en actualizar producto ${error}` });
  }
};

export const deleteProduct = async (request, response) => {
  const { pid } = request.params;

  try {
    const prod = await productModel.findByIdAndDelete(pid);
    if (prod) {
      return response.status(200).send(prod);
    }
    response.status(404).send({ error: "Producto no encontrado" });
  } catch (error) {
    response.status(500).send({ error: `Error en eliminar producto ${error}` });
  }
};
