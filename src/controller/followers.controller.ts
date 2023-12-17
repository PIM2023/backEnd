import e, { Request, Response } from "express";
import { User } from "../entity/User";
import { Followers } from "../entity/Followers";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";

const userRepository = dataSource.getRepository(User);
const followersRepository = dataSource.getRepository(Followers);

export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const followers = await followersRepository.find({
      where: { followingId: numericId },
    });

    if (followers) {
      return res.json(followers);
    } else {
      handleErrorResponse(res, "Usuario no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(
      res,
      "Error al obtener los followers del id especificado",
      500
    );
  }
};

export const getFollowing = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const following = await followersRepository.find({
      where: { followerId: numericId },
    });

    if (following) {
      return res.json(following);
    } else {
      handleErrorResponse(res, "Usuario no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(
      res,
      "Error al obtener los usarios que sigue el usuaio del id especificado",
      500
    );
  }
};

export const follow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const { followerId } = req.body;
    const user = await userRepository.findOne({
      where: { id: numericId },
      relations: { profile: true },
    });

    if (!user) return handleErrorResponse(res, "Usuario no encontrado", 404);
    if (user.id === followerId)
      return handleErrorResponse(res, "No puedes seguirte a ti mismo", 400);
    if (
      await followersRepository.findOne({
        where: { followingId: numericId, followerId: followerId },
      })
    )
      return handleErrorResponse(res, "Ya sigues a este usuario", 400);

    console.log(user.profile);
    const newFollower = new Followers();
    newFollower.user = user;
    newFollower.followingId = numericId;
    newFollower.followerId = followerId;
    newFollower.following_avatar = user.profile.avatar;
    newFollower.following_username = user.username;

    const follower = await followersRepository.save(newFollower);

    return res.json(follower);
  } catch (error) {
    handleErrorResponse(res, "Error al seguir al usuario", 500);
  }
};

export const unfollow = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const { followerId } = req.body;
    const user = await userRepository.findOne({ where: { id: numericId } });

    if (!user) return handleErrorResponse(res, "Usuario no encontrado", 404);
    if (user.id === followerId)
      return handleErrorResponse(res, "No puedes seguirte a ti mismo", 400);

    let follow = await followersRepository.findOne({
      where: { followingId: numericId, followerId: followerId },
    });

    if (follow) {
      await followersRepository.remove(follow);

      return res.json(
        "El usuario con el id " +
          followerId +
          " ha dejado de seguir al usuario especificado con el id " +
          id
      );
    } else {
      return handleErrorResponse(res, "No sigues a este usuario", 400);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al dejar de seguir al usuario", 500);
  }
};
