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
  const numericId = parseInt(id);
  const user = await userRepository.findOneBy({ id: numericId });

  if (user) {
    return res.json(user);
  } else {
    handleErrorResponse(res, "User not found", 404);
  }
};

export const save = async (req: Request, res: Response) => {
  try {
    const { username, email, password, firstName, lastName, avatar, height, weight, bornDate } = req.body;

    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    const newProfile = new Profile();
    newProfile.firstName = firstName;
    newProfile.lastName = lastName;
    newProfile.avatar = avatar;
    newProfile.height = height;
    newProfile.weight = weight;

    newProfile.bornDate = new Date (bornDate);
    newProfile.age = Math.floor((Date.now() - newProfile.bornDate.getTime()) / 1000 / 60 / 60 / 24 / 365);

    newUser.profile = newProfile;

    profileRepository.save(newProfile);      
    const savedUser = await userRepository.save(newUser);
    
    res.json(savedUser);
  } catch (error) {
    console.error(error);
    handleErrorResponse(res, "Error al guardar el usuario", 500);
  }
};

export const update = async (req: Request, res: Response) => {
  
};

export const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const user = await userRepository.findOneBy({ id: numericId });
  const profile = await profileRepository.findOneBy({ id: numericId });

  if (user && profile) {
    await profileRepository.remove(profile);
    await userRepository.remove(user);
    res.json({ message: "User and Profile deleted" });
  } else if (user){
    await userRepository.remove(user);
    res.json({ message: "User deleted" });
  } else{
    handleErrorResponse(res, "User not found", 404);
  }

};
