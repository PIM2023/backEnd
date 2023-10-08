import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";

const userRepository = dataSource.getRepository(User);

export const all = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  return res.json(users);
};

export const one = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userRepository.findOneBy({ id });

  if (user) {
    return res.json(user);
  } else {
    handleErrorResponse(res, "User not found", 404);
  }
};

export const save = async (req: Request, res: Response) => {};

export const update = async (req: Request, res: Response) => {};

export const remove = async (req: Request, res: Response) => {};
