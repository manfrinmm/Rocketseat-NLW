import { Router } from "express";

import ItemsController from "./controller/ItemsController";
import PointsController from "./controller/PointsController";

const routes = Router();

routes.get("/", (req, res) => {
  res.send("ok");
});

routes.get("/items", ItemsController.index);

routes.get("/points", PointsController.index);
routes.post("/points", PointsController.store);
routes.post("/points/:id", PointsController.show);

export default routes;
