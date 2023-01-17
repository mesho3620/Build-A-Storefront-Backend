import express, { NextFunction, Request, Response } from "express";
import { order, orders } from "../models/order";
import jwt from "jsonwebtoken";

const ordersService = new orders();

const index = async (_req: Request, res: Response) => {
  const p = await ordersService.index();
  res.json(p);
};

const show = async (req: Request, res: Response) => {
  const p = await ordersService.show(req.body.id);

  res.json(p);
};

const showUserOrders = async (req: Request, res: Response) => {
  const p = await ordersService.showUserOrders(req.body.user_id);

  res.json(p);
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
      id: req.body.id,
      user_id: req.body.user_id,
      product_id: req.body.product_id,
      status: req.body.status,
    };
    const neworder = await ordersService.create(o);
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
  app.get("/orders/search/", show);
  app.get("/orders", index);
  app.post("/orders", verifyAuthToken, create);
  app.delete("/orders", verifyAuthToken, destroyorder);
  app.get("orders/searchUserOrders", showUserOrders);
};

export default ordersRoutes;
