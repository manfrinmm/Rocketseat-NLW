import { Request, Response } from "express";

import knex from "../database/connection";

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items = [1, 2, 3, 4, 5, 6] } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map(item => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.item_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    const serializedPoints = points.map(point => ({
      ...point,
      image_url: encodeURI(`http://192.168.0.101:3333/uploads/${point.image}`),
    }));

    return res.json(serializedPoints);
  }

  async store(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      uf,
      city,
      items,
    } = req.body;

    try {
      const trx = await knex.transaction();

      const point = {
        image: req.file.filename,
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        uf,
        city,
      };

      const pointIds = await trx("points").insert(point);

      const pointItems = items
        .split(",")
        .map((item: string) => Number(item.trim()))
        .map((item_id: number) => ({
          item_id,
          point_id: pointIds[0],
        }));

      await trx("point_items").insert(pointItems);

      await trx.commit();

      res.status(201).json({ id: pointIds[0], ...point });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where("id", id).first();

    if (!point) {
      return res.status(400).json({ message: "Point not found" });
    }

    const items = await knex("items")
      .join("point_items", "items.id", "=", "point_items.item_id")
      .select(["items.id", "items.title", "items.image"])
      .where("point_items.point_id", id);

    const serializedItems = items.map(item => ({
      ...item,
      image_url: encodeURI(`http://192.168.0.101:3333/uploads/${item.image}`),
    }));

    const serializedPoints = {
      ...point,
      image_url: encodeURI(`http://192.168.0.101:3333/uploads/${point.image}`),
    };

    return res.json({ point: serializedPoints, items: serializedItems });
  }
}

export default new PointsController();
