import { Request, Response } from "express";
import { Profile } from "../entity/Profile";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { User } from "../entity/User";

const profileRepository = dataSource.getRepository(Profile);
const userRepository = dataSource.getRepository(User);

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

export const save = async (req: Request, res: Response) => {};

export const update = async (req: Request, res: Response) => {};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  /*const profile = await profileRepository.findOne({
    relations: {
      user: true,
    },
    select: id,
  });

  if (profile) {
    await profileRepository.remove(profile);
  } else {
    handleErrorResponse(res, "Profile not found", 404);
  }*/
};
