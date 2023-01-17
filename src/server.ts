import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productsRoutes from "./handlers/products";
import usersRoutes from "./handlers/users";
import ordersRoutes from "./handlers/orders";

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!!!!");
});

productsRoutes(app);
usersRoutes(app);
ordersRoutes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
