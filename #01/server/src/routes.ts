import { Router } from "express";

import multer from "multer";

import multerConfig from "./config/multer";
import ItemsController from "./controller/ItemsController";
import PointsController from "./controller/PointsController";

const routes = Router();

const upload = multer(multerConfig);

routes.get("/", (req, res) => {
  res.send("ok");
});

routes.get("/items", ItemsController.index);

routes.get("/points", PointsController.index);
routes.post("/points", upload.single("image"), PointsController.store);
routes.get("/points/:id", PointsController.show);

export default routes;
