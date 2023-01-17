import express, { NextFunction, Request, Response } from "express";
import { product, products } from "../models/product";
import jwt from "jsonwebtoken";

const productsService = new products();

const index = async (_req: Request, res: Response) => {
  const p = await productsService.index();
  res.json(p);
};

const show = async (req: Request, res: Response) => {
  const p = await productsService.show(req.body.id);
  res.json(p);
};

const create = async (req: Request, res: Response) => {
  try {
    const p: product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
    };
    const newProduct = await productsService.create(p);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroyProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await productsService.delete(req.body.id);

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

const productsRoutes = (app: express.Application) => {
  app.get("/products/search/", show);
  app.get("/products", index);
  app.post("/products", verifyAuthToken, create);
  app.delete("/products", verifyAuthToken, destroyProduct);
};

export default productsRoutes;
