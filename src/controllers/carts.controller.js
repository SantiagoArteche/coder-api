import { cartsModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";

export const getCart = async (request, response) => {
  try {
    const cart = await cartsModel.find();
    response.status(200).send({ res: "OK", message: cart });
  } catch (error) {
    response.status(404).send({ res: "ERROR", message: error });
  }
};

export const getCartById = async (request, response) => {
  const { cid } = request.params;
  try {
    const cartById = await cartsModel.findById(cid);
    response.status(200).send({ res: "OK", message: cartById });
  } catch (error) {
    response.status(404).send({ res: "ERROR", message: error });
  }
};

export const createCart = async (request, response) => {
  try {
    const cartCreate = await cartsModel.create({});

    response.status(200).send({ res: "OK", message: cartCreate });
  } catch (error) {
    response.status(404).send({ res: "ERROR", message: error });
  }
};

export const addProductToCart = async (request, response) => {
  const { cid, pid } = request.params;
  const { quantity } = request.body;

  try {
    const cart = await cartsModel.findById(cid);

    if (cart) {
      const product = await productModel.findById(pid);

      if (product) {
        const index = cart.products.findIndex(
          (element) => element.id_prod._id == pid
        );
        if (index != -1) {
          cart.products[index].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }
        const resp = await cartsModel.findByIdAndUpdate(cid, cart);
        response.status(200).send({ res: "OK", message: resp });
      } else {
        response.status(404).send({
          res: "Error en agregar producto al carrito",
          message: "Producto no encontrado",
        });
      }
    } else {
      response.status(404).send({
        res: "Error en agregar producto al carrito",
        message: "Carrito no encontrado",
      });
    }
  } catch (error) {
    response
      .status(404)
      .send({ res: "Error en agregar producto al carrito", message: error });
  }
};

export const deleteCartProduct = async (request, response) => {
  const { cid, pid } = request.params;

  try {
    const cart = await cartsModel.findById(cid);

    if (cart) {
      const product = await productModel.findById(pid);

      if (product) {
        const index = cart.products.findIndex(
          (element) => element.id_prod._id == pid
        );

        if (index != -1) {
          cart.products.splice(index, 1);
        }
        const resp = await cartsModel.findByIdAndUpdate(cid, cart);
        response.status(200).send({ res: "OK", message: resp });
      } else {
        response.status(404).send({
          res: "Error en borrar producto del carrito",
          message: "Producto no encontrado",
        });
      }
    } else {
      response.status(404).send({
        res: "Error en borrar producto del carrito",
        message: "Carrito no encontrado",
      });
    }
  } catch (error) {
    response
      .status(404)
      .send({ res: "Error en borrar producto del carrito", message: error });
  }
};

export const updateCart = async (request, response) => {
  const { cid } = request.params;
  const arrayProd = request.body.products;
  console.log(arrayProd);
  try {
    const cart = await cartsModel.findById(cid);

    for (const prod of arrayProd) {
      const product = await productModel.findById(prod.id_prod);
      if (!product) {
        return response.status(404).send({
          resp: "Error",
          mes: `Producto con ID ${prod.id_prod} no encontrado`,
        });
      }
      const index = cart.products.findIndex(
        (element) => element.id_prod._id == prod.id_prod
      );
      if (index != -1) {
        cart.products[index].quantity = prod.quantity;
      } else {
        cart.products.push({ id_prod: prod.id_prod, quantity: prod.quantity });
      }
    }

    const resp = await cartsModel.findByIdAndUpdate(cid, {
      products: cart.products,
    });

    response.status(200).send({ res: "OK", message: resp });
  } catch (error) {
    response.status(404).send({ res: "ERROR", message: error });
  }
};

export const clearCart = async (request, response) => {
  const { cid } = request.params;
  try {
    await cartsModel.findByIdAndUpdate(cid, { products: [] });
    response.status(200).send({ res: "OK", message: "Carrito vaciado" });
  } catch (error) {
    response
      .status(404)
      .send({ res: "Error en vaciar productos del carrito", message: error });
  }
};

export const changeProductQuantity = async (request, response) => {
  const { cid, pid } = request.params;
  const { quantity } = request.body;

  try {
    const cart = await cartsModel.findById(cid);

    if (cart) {
      const product = await productModel.findById(pid);
      console.log(product);
      if (product) {
        const index = cart.products.findIndex(
          (prods) => prods.id_prod._id == pid
        );
        if (index != -1) {
          cart.products[index].quantity = quantity;
        } else {
          cart.products.push({ id_prod: pid, quantity: quantity });
        }

        const updatedCart = await cartsModel.findByIdAndUpdate(cid, {
          products: cart.products,
        });
        response.status(200).send({ res: "OK", message: updatedCart });
      }
    }
  } catch (error) {
    response.status(404).send({
      res: "Error en al actualizar producto del carrito",
      message: error,
    });
  }
};
