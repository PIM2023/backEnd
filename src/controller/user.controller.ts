import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Profile } from "../entity/Profile";
import { profile } from "console";

const userRepository = dataSource.getRepository(User);
const profileRepository = dataSource.getRepository(Profile);

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

export const save = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const newProfile = new Profile();
    newProfile.firstName = "John";
    newProfile.lastName = "Doe";
    newProfile.age = 20;

    newUser.profile = newProfile;

    const savedUser = await userRepository.save(newUser);
    profileRepository.save(newProfile);

    res.json(savedUser);
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, "Error al guardar el usuario", 500);
  }
};

export const update = async (req: Request, res: Response) => {};

export const remove = async (req: Request, res: Response) => {};
