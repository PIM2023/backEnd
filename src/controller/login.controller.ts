import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { ImageHandler } from "../utils/ImageHandler";

const userRepository = dataSource.getRepository(User);

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return handleErrorResponse(res, "Usuario y contraseña requeridos", 400);
    }

    const emailParsed = email.toString();

    const user = await userRepository.findOne({
      where: { email: emailParsed },
      relations: { profile: true },
    });
    if (!user) {
      return handleErrorResponse(res, "Usuario no encontrado", 404);
    }

    const isPasswordValid = user?.password === password;
    if (!isPasswordValid) {
      return handleErrorResponse(res, "Contraseña incorrecta", 400);
    }

    if (user.profile && user.profile.avatar) {
      user.profile.avatar = ImageHandler.encodeBufferToBase64(
        user.profile.avatar
      );
    }

    return res.json(user);
  } catch (error) {
    handleErrorResponse(res, error.message, 500);
  }
};
