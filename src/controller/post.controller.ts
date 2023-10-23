import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Post } from "../entity/Post";

const userRepository = dataSource.getRepository(User);
const postRepository = dataSource.getRepository(Post);

export const create = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;
    const numericId = parseInt(id);
    if (!image) {
      return handleErrorResponse(res, "Imagen requerida", 400);
    }

    if (!text) {
      return handleErrorResponse(res, "Texto requerido", 400);
    }

    const newPost = new Post();
    newPost.text = text;
    newPost.image = image;
    newPost.likes = 0;

    const savedPost = await postRepository.save(newPost);
    const currentUser = await userRepository.findOneBy({ id: numericId });
    currentUser.posts.push(newPost);

    res.json(savedPost);
  } catch (error) {
    handleErrorResponse(res, "Error al crear el post", 500);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await postRepository.findOneBy(postId);
    //FIXME igual falta parsearlo a int

    if (!post) return handleErrorResponse(res, "Post no encontrado", 404);

    await postRepository.remove(post);
    return res.json("Post eliminado");
  } catch (error) {
    handleErrorResponse(res, "Error al borrar el post", 500);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const post = await postRepository.findOneBy(postId);
    //FIXME igual falta parsearlo a int

    if (post) {
      return res.json(post);
    } else {
      handleErrorResponse(res, "Post no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener el post", 500);
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.find();
    return res.json(posts);
  } catch (error) {
    handleErrorResponse(res, "Error al obtener los posts", 500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    handleErrorResponse(res, "Error al actualizar el post", 500);
  }
};
