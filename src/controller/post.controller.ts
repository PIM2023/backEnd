import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Post } from "../entity/Post";
import { ImageHandler } from "../utils/ImageHandler";
import { Tag } from "../entity/Tag";
import { parse } from "path";
import { stringify } from "querystring";

const userRepository = dataSource.getRepository(User);
const postRepository = dataSource.getRepository(Post);
const tagRepository = dataSource.getRepository(Tag);

export const getAll = async (req: Request, res: Response) => {
  try {
    const posts = await postRepository.find({
      relations: { user: true, comments: true },
    });

    if (!posts) {
      return handleErrorResponse(res, "No hay posts", 404);
    }

    const sanitazedPost = posts.map((post) => {
      console.log(post);
      return {
        id: post.id,
        username: post.user.username,
        text: post.text,
        image: post.image,
        likes: post.likes,
        comments: post.comments,
        tags: post.tags,
      };
    });

    return res.json(sanitazedPost);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "Error al obtener los posts", 500);
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);

    const post = await postRepository.findOne({
      where: { id: numericId },
      relations: { user: true, comments: true },
    });

    if (!post) {
      return handleErrorResponse(res, "Post no encontrado", 404);
    }

    const sanitizedPost = {
      id: post.id,
      username: post.user.username,
      text: post.text,
      image: post.image,
      likes: post.likes,
      comments: post.comments,
      tags: post.tags,
    };

    return res.json(sanitizedPost);
  } catch (error) {
    handleErrorResponse(res, "Error al obtener el post", 500);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { userId, text, tags, image } = req.body;

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
    if (!tags) {
      return handleErrorResponse(res, "Tags requeridos", 404);
    }

    let tagsArray = [];
    console.log(tags);
    let objTags = JSON.parse(tags);
    console.log(objTags);
    objTags.forEach((tag) => {
      tagRepository.findOneBy({ name: tag }).then((tag: Tag) => {
        tagsArray.push(tag);
      });
      console.log(tag);
    });

    const newPost = new Post();
    newPost.text = text;
    newPost.image = image;
    newPost.user = currentUser;
    newPost.tags = tagsArray;

    const savedPost = await postRepository.save(newPost);
    const sanitizedPost = {
      id: savedPost.id,
      username: savedPost.user.username,
      text: savedPost.text,
      image: savedPost.image,
      likes: savedPost.likes,
      comments: savedPost.comments,
      tags: savedPost.tags,
    };

    res.json(sanitizedPost);
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, "Error al crear el post", 500);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, image, tags } = req.body;

    const post = await postRepository.findOne({
      where: { id: parseInt(id) },
      relations: { user: true, comments: true },
    });

    if (!post) {
      return handleErrorResponse(res, "Post no encontrado", 404);
    }

    if (!text && !image) {
      return handleErrorResponse(res, "Texto o imagen requeridos", 400);
    }

    if (!tags) {
      return handleErrorResponse(res, "Tags requeridos", 400);
    }

    if (text) {
      post.text = text;
    }

    if (image) {
      post.image = image;
    }

    if (tags) {
      post.tags = tags;
    }

    const updatedPost = await postRepository.save(post);

    const sanitizedPost = {
      id: updatedPost.id,
      username: updatedPost.user.username,
      text: updatedPost.text,
      image: updatedPost.image,
      //likes: updatedPost.likes, creo que no debería actualizar los likes
      comments: updatedPost.comments,
      tags: updatedPost.tags,
    };

    return res.json(sanitizedPost);
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
