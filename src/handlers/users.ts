import express, { NextFunction, Request, Response } from "express";
import { user, users } from "../models/user";
import jwt from "jsonwebtoken";

const usersService = new users();

const index = async (_req: Request, res: Response) => {
  const p = await usersService.index();
  res.json(p);
};

const show = async (req: Request, res: Response) => {
  const p = await usersService.show(req.body.id);

  res.json(p);
};

const create = async (req: Request, res: Response) => {
  try {
    const u: user = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    };
    const newuser = await usersService.create(u);
    const token = jwt.sign(
      { user: newuser },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroyuser = async (req: Request, res: Response) => {
  try {
    const deleted = await usersService.delete(req.body.id);
    res.json(deleted);
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const user: user = {
      first_name: req.body.first_name,
      password: req.body.password,
      id: req.body.id,
      last_name: req.body.last_name,
    };
    const u = await usersService.authenticate(user.first_name, user.password);

    var token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as string);

    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
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

const usersRoutes = (app: express.Application) => {
  app.get("/users/search/", show);
  app.get("/users", index);
  app.post("/users", create);
  app.post("/users/authenticate", authenticate);
  app.delete("/users", verifyAuthToken, destroyuser);
};

export default usersRoutes;
