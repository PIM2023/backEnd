import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Post } from "../entity/Post";

const userRepository = dataSource.getRepository(User);
const postRepository = dataSource.getRepository(Post);

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.find({
      relations: { user: true },
    });

    if (posts) {
      const sanitizedPost = posts.map((post) => {
        return {
          id: post.id,
          text: post.text,
          image: post.image,
          likes: post.likes,
          username: post.user.username,
        };
      });

      return res.json(sanitizedPost);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener los posts", 500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { userId, text, image } = req.body;

    const numericId = parseInt(userId);
    const currentUser = await userRepository.findOneBy({ id: numericId });
    if (!currentUser) {
      return handleErrorResponse(res, "Usuario no encontrado", 404);
    }

    if (!image) {
      return handleErrorResponse(res, "Imagen requerida", 404);
    }

    if (!text) {
      return handleErrorResponse(res, "Texto requerido", 404);
    }

    const newPost = new Post();
    newPost.text = text;
    newPost.image = image;
    newPost.user = currentUser;

    const savedPost = await postRepository.save(newPost);

    res.json(savedPost);
  } catch (error) {
    handleErrorResponse(res, "Error al crear el post", 500);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const numericId = parseInt(id);
    const post = await postRepository.find({
      where: { id: numericId },
      relations: { user: true },
    });

    if (post.length > 0) {
      const sanitizedPost = post.map((post) => {
        return {
          id: post.id,
          text: post.text,
          image: post.image,
          likes: post.likes,
          username: post.user.username,
        };
      });

      return res.json(sanitizedPost);
    } else {
      handleErrorResponse(res, "Post no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener el post", 500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body;

    const post = await postRepository.findOneBy({ id: parseInt(id) });

    if (!post) {
      return handleErrorResponse(res, "Post no encontrado", 404);
    }

    if (!text && !image) {
      return handleErrorResponse(res, "Texto o imagen requeridos", 400);
    }

    if (text) {
      post.text = text;
    }

    if (image) {
      post.image = image;
    }

    const updatedPost = await postRepository.save(post);

    return res.json(updatedPost);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "Error al actualizar el post", 500);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);

    const post = await postRepository.findOneBy({ id: numericId });

    if (!post) return handleErrorResponse(res, "Post no encontrado", 404);

    await postRepository.remove(post);
    return res.json(`Post ${numericId} eliminado`);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "Error al borrar el post", 500);
  }
};
