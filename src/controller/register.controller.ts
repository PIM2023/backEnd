import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Profile } from "../entity/Profile";
import { ImageHandler } from "../utils/ImageHandler";

const userRepository = dataSource.getRepository(User);
const profileRepository = dataSource.getRepository(Profile);

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const { firstName, lastName, avatar } = req.body;
    const { height, weight, bornDate } = req.body;

    if (!username || !email || !password) {
      return handleErrorResponse(
        res,
        "Usuario, email y contraseña requeridos",
        400
      );
    }

    if (!firstName || !lastName || !bornDate) {
      return handleErrorResponse(
        res,
        "Nombre, apellido y fecha de nacimiento requeridos",
        400
      );
    }

    const existUsername = await userRepository.findOneBy({ username });
    if (existUsername) {
      return handleErrorResponse(res, "El usuario ya existe", 400);
    }

    const existEmail = await userRepository.findOneBy({ email });
    if (existEmail) {
      return handleErrorResponse(res, "El email ya existe", 400);
    }

    const newUser = new User();
    newUser.username = username.toString();
    newUser.email = email.toString();
    newUser.password = password.toString();

    const newProfile = new Profile();
    newProfile.firstName = firstName.toString();
    newProfile.lastName = lastName.toString();
    if (avatar) newProfile.avatar = ImageHandler.decodeBase64ToBuffer(avatar);
    if (height) newProfile.height = parseInt(height.toString());
    if (weight) newProfile.weight = parseInt(weight.toString());
    newProfile.bornDate = new Date(bornDate.toString());
    newProfile.age = Math.floor(
      (Date.now() - newProfile.bornDate.getTime()) / 1000 / 60 / 60 / 24 / 365
    );

    newUser.profile = newProfile;

    await profileRepository.save(newProfile);
    const savedUser = await userRepository.save(newUser);

    res.json(savedUser);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      handleErrorResponse(res, "El usuario ya existe", 400);
    } else {
      handleErrorResponse(res, "Error al guardar el usuario", 500);
    }
  }
};
