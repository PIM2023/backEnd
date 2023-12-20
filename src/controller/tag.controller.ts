import { Request, Response } from "express";
import { AppDataSource as dataSource } from "../data-source";
import { Tag } from "../entity/Tag";
import { handleErrorResponse } from "../utils/handleError";

const tagRespository = dataSource.getRepository(Tag);

export const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await tagRespository.find();
    return res.json(tags);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "Error al obtener los tags", 500);
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return handleErrorResponse(res, "Nombre requerido", 400);
    }

    const newTag = new Tag();
    newTag.name = name;

    await tagRespository.save(newTag);
    return res.json(newTag);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "Error al crear el tag", 500);
  }
};
