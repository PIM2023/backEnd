import { Request, Response } from "express";
import { Tag } from "../entity/Tag";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";

const tagRepository = dataSource.getRepository(Tag);
export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagRepository.find();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los tags" });
  }
};
