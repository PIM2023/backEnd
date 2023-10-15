import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Profile } from "../entity/Profile";

const userRepository = dataSource.getRepository(User);
const profileRepository = dataSource.getRepository(Profile);

export const all = async (req: Request, res: Response) => {
  const users = await userRepository.find();
  return res.json(users);
};

export const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  const user = await userRepository.findOneBy({ id: numericId });

  if (user) {
    return res.json(user);
  } else {
    handleErrorResponse(res, "User not found", 404);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      avatar,
      height,
      weight,
      bornDate,
    } = req.body;

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
    newProfile.bornDate = new Date(bornDate);
    newProfile.age = Math.floor(
      (Date.now() - newProfile.bornDate.getTime()) / 1000 / 60 / 60 / 24 / 365
    );

    newUser.profile = newProfile;

    const savedUser = await userRepository.save(newUser);
    profileRepository.save(newProfile);

    res.json(savedUser);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleErrorResponse(res, "El usuario ya existe", 400);
    } else {
      handleErrorResponse(res, "Error al guardar el usuario", 500);
    }
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { email, firstName, lastName, avatar, height, weight, bornDate } =
      req.body;

    const numericId = parseInt(userId);
    const user = await userRepository.findOneBy({ id: numericId });

    if (!user) return handleErrorResponse(res, "Usuario no encontrado", 404);

    const profile = user.profile;

    if (email) user.email = email;
    if (firstName) profile.firstName = firstName;
    if (lastName) profile.lastName = lastName;
    if (avatar) profile.avatar = avatar;
    if (height) profile.height = height;
    if (weight) profile.weight = weight;
    if (bornDate) {
      profile.bornDate = new Date(bornDate);
      profile.age = Math.floor(
        (Date.now() - profile.bornDate.getTime()) / 1000 / 60 / 60 / 24 / 365
      );
    }

    profileRepository.save(profile);
    userRepository.save(user);

    res.json(user);
  } catch (error) {
    handleErrorResponse(res, "Error al actualizar el usuario", 500);
  }
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
  } else if (user) {
    await userRepository.remove(user);
    res.json({ message: "User deleted" });
  } else {
    handleErrorResponse(res, "User not found", 404);
  }
};
