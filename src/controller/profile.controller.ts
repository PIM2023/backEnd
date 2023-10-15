import { Request, Response } from "express";
import { Profile } from "../entity/Profile";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";

const profileRepository = dataSource.getRepository(Profile);

export const all = async (req: Request, res: Response) => {
  const profiles = await profileRepository.find();
  return res.json(profiles);
};

export const one = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const profile = await profileRepository.findOne({ where: { id: numericId } });

  if (profile) {
    return res.json(profile);
  } else {
    handleErrorResponse(res, "Profile not found", 404);
  }
};

export const update = async (req: Request, res: Response) => {};
