import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";

const userRepository = dataSource.getRepository(User);
const postRepository = dataSource.getRepository(Post);

export const getAllDatePostCreatedsByUser = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const numericId = parseInt(id);
    const currentUser = await userRepository.find({
      where: { id: numericId },
      relations: { posts: true },
    });

    if (currentUser) {
      const posts = currentUser[0].posts;
      const datePostsSet = new Set<string>();

      posts.forEach((post) => {
        const date = post.createdAt.toISOString().split("T")[0];
        datePostsSet.add(date);
      });

      const datePosts = Array.from(datePostsSet);

      return res.json(datePosts);
    } else {
      handleErrorResponse(res, "Usuario no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener la fecha de los posts", 500);
  }
};

export const getDatePostsCreatedInYear = async (
  req: Request,
  res: Response
) => {
  try {
    const { id, year } = req.params;
    const numericId = parseInt(id);
    const currentUser = await userRepository.find({
      where: { id: numericId },
      relations: { posts: true },
    });

    if (currentUser) {
      const nuemricYear = parseInt(year);

      if (isNaN(nuemricYear)) {
        handleErrorResponse(res, "El año debe ser un numero", 400);
      } else {
        const posts = currentUser[0].posts.filter((post) => {
          if (post.createdAt.getFullYear() == nuemricYear) {
            return post;
          }
        });
        const datePostsSet = new Set<string>();

        posts.forEach((post) => {
          const date = post.createdAt.toISOString().split("T")[0];
          datePostsSet.add(date);
        });

        const datePosts = Array.from(datePostsSet);

        return res.json(datePosts);
      }
    } else {
      handleErrorResponse(res, "Usuario no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener la fecha de los posts", 500);
  }
};

export const getCreatedPostsByDate = async (req: Request, res: Response) => {
  try {
    const { id, year, month, day } = req.params;
    const numericId = parseInt(id);
    const currentUser = await userRepository.find({
      where: { id: numericId },
      relations: { posts: true },
    });

    if (currentUser) {
      const nuemricYear = parseInt(year);
      const numericMonth = parseInt(month);
      const numericDay = parseInt(day);

      if (isNaN(nuemricYear) || isNaN(numericMonth) || isNaN(numericDay)) {
        handleErrorResponse(res, "La fechas deben de ser un numero", 400);
      } else {
        const posts = currentUser[0].posts.filter((post) => {
          let postDate = post.createdAt;
          if (
            postDate.getFullYear() == nuemricYear &&
            postDate.getMonth() + 1 == numericMonth &&
            postDate.getDate() == numericDay
          ) {
            return post;
          }
        });

        return res.json(posts);
      }
    } else {
      handleErrorResponse(res, "Usuario no encontrado", 404);
    }
  } catch (error) {
    handleErrorResponse(res, "Error al obtener la fecha de los posts", 500);
  }
};
