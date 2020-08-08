import { Request, Response } from "express";

import db from "../../database/connection";

class ConnectionsController {
  async index(req: Request, res: Response): Promise<Response> {
    const [totalConnections] = await db("connections").count("* as total");

    return res.json(totalConnections);
  }

  async store(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    try {
      await db("connections").insert({
        user_id,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Unexpected error while creating new class" });
    }

    return res.status(201).send();
  }
}

export default new ConnectionsController();
