import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Profile } from "../entity/Profile";
import exp = require("constants");

const userRepository = dataSource.getRepository(User);
const profileRepository = dataSource.getRepository(Profile);

export const all = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();
    return res.json(users);
  } catch (error) {
    handleErrorResponse(res, "Error al obtener los usuarios", 500);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const user = await userRepository.findOneBy({ id: numericId });

    if (user) {
      return res.json(user);
    } else {
      handleErrorResponse(res, "User not found", 404);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener el usuario", 500);
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
  try {
    const { id } = req.params;
    const numericId = parseInt(id);

    const user = await userRepository.findOne({
      where: { id: numericId },
      relations: { profile: true },
    });

    if (!user) return handleErrorResponse(res, "Usuario no encontrado", 404);

    console.log(user.profile);

    await profileRepository.remove(user.profile);
    await userRepository.remove(user);

    return res.json("Usuario eliminado");
  } catch (error) {
    handleErrorResponse(res, "Error al eliminar el usuario", 500);
  }
};

export const checkUsername = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await userRepository.findOneBy({ username: username });

    console.log(user);
    if (user) {
      return res.json({ exist: true });
    } else {
      return res.json({ exist: false });
    }
  } catch (error) {
    handleErrorResponse(res, "Error al verificar el usuario", 500);
  }
};

export const checkEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await userRepository.findOneBy({ email: email });

    if (user) {
      return res.json({ exist: true });
    } else {
      return res.json({ exist: false });
    }
  } catch (error) {
    handleErrorResponse(res, "Error al verificar el email", 500);
  }
};

export const getProfiles = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    handleErrorResponse(res, "Error ")
  }
}