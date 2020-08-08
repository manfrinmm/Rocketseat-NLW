import { Router } from "express";

import ClassesController from "./app/controllers/ClassesController";
import ConnectionsController from "./app/controllers/ConnectionsController";

const routes = Router();

routes.get("/classes", ClassesController.index);
routes.post("/classes", ClassesController.store);

routes.get("/connections", ConnectionsController.index);
routes.post("/connections", ConnectionsController.store);

export default routes;
