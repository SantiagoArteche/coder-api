import { cartsModel } from "../models/carts.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { productModel } from "../models/products.models.js";

export const buy = async (request, response) => {
  const { cid } = request.params;
  const purchaser = request.user.user.email;
  const rol = request.user.user.rol;

  try {
    const cart = await cartsModel.findById(cid);
    if (!cart) {
      return res.status(404).send({ message: "Carrito no encontrado" });
    }
    let totalAmount = 0;
    const productsWithStock = [];
    const productsWithoutStock = [];

    for (const el of cart.products) {
      const product = await productModel.findById(el.id_prod);

      let cartQuantity = el.quantity;

      if (!product) {
        return response.status(404).send({
          respuesta: "Error",
          mensaje: `Producto con ID ${cartProduct.id_prod} no encontrado`,
        });
      }

      if (product.stock >= cartQuantity) {
        totalAmount += product.price * cartQuantity;

        product.stock -= cartQuantity;
        cartQuantity = 0;
        await productModel.findByIdAndUpdate(el.id_prod, product);
        productsWithStock.push(el);
      } else {
        productsWithoutStock.push(el);
      }
    }
    if (rol === "premium") totalAmount = totalAmount * 0.9;
    const ticket = await ticketModel.create({
      amount: totalAmount,
      purchaser: purchaser,
    });
    if (ticket) {
      cart.products = productsWithStock;
    }
    const updateCart = await cartsModel.findByIdAndUpdate(cid, {
      products: cart.products,
    });
    if (updateCart) {
      return response
        .status(200)
        .send({ mes: "Venta realizada!", ticket: ticket });
    }
    return response.status(500).send({
      res: "Error",
    });
  } catch (error) {
    return response.status(500).send({ error: error });
  }
};
