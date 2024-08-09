import {Order} from "../models/order";
import {Request, Response} from "express";

export const getOrders = async (req: Request, res: Response) => {
    const orders = await Order.findAll();
    res.json(orders);
}