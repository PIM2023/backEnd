import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";

const userRepository = dataSource.getRepository(User);

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await userRepository.findOneBy({ username });
    const isPasswordValid = user?.password === password;

    if (!username || !password) {
      return handleErrorResponse(res, "Usuario y contraseña requeridos", 400);
    }

    if (!user) {
      return handleErrorResponse(res, "Usuario no encontrado", 404);
    }

    if (!isPasswordValid) {
      return handleErrorResponse(res, "Contraseña incorrecta", 400);
    }

    return res.json(user);
  } catch (error) {
    handleErrorResponse(res, error.message, 500);
  }
};
