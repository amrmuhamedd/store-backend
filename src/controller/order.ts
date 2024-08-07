import { Request, Response } from "express";

import { OrderModel } from "../models/orders";
import { ProductModel } from "../models/products";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { products, ...orderKeys } = req.body;

    const productDocs = await ProductModel.find({ _id: { $in: products } });

    if (productDocs.length !== products.length) {
      return res
        .status(400)
        .json({ error: "One or more products are invalid" });
    }

    const totalPrice = productDocs.reduce(
      (sum, product) => sum + product.price,
      0
    );

    const order = new OrderModel({
      ...orderKeys,
      price: totalPrice,
      products,
      user: req.user?._id,
    });

    await order.save();
    res.status(201).json({ order, user: req.user?._id });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await OrderModel.find()
      .populate("products")
      .populate("user");
    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
};
