import express, { NextFunction, Request, Response } from "express";
import { order, orders } from "../models/order";
import jwt from "jsonwebtoken";

const ordersService = new orders();

const index = async (_req: Request, res: Response) => {
  try {
    const p = await ordersService.index();
    res.json(p);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const p = await ordersService.show(parseInt(req.params["id"]));
    res.json(p);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const showUserOrders = async (req: Request, res: Response) => {
  try {
    const p = await ordersService.showUserOrders(
      parseInt(req.params["user_id"])
    );
    res.json(p);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json("Access Denied");
    return;
  }

  try {
    const o: order = {
      id: parseInt(req.params["id"]),
      user_id: parseInt(req.params["user_id"]),
      status: req.body.status,
    };
    const neworder = await ordersService.create(o);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json("Access Denied");
    return;
  }

  try {
    const orderID = req.body.order_id;
    const productID = req.body.product_id;
    const neworder = await ordersService.addProduct(orderID, productID);
    res.json(neworder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroyorder = async (req: Request, res: Response) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (error) {
    res.status(401);
    res.json("Access Denied");
    return;
  }

  try {
    const deleted = await ordersService.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.status(401);
  }
};

const ordersRoutes = (app: express.Application) => {
  app.get("/orders/search/", verifyAuthToken, show);
  app.get("/orders", verifyAuthToken, index);
  app.post("/orders", verifyAuthToken, create);
  app.post("/orders/addProduct", verifyAuthToken, addProduct);
  app.delete("/orders", verifyAuthToken, destroyorder);
  app.get("orders/searchUserOrders", showUserOrders);
};

export default ordersRoutes;
