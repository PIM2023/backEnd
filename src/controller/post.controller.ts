import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource as dataSource } from "../data-source";
import { handleErrorResponse } from "../utils/handleError";
import { Profile } from "../entity/Profile";
import { Post } from "../entity/Post";

const userRepository = dataSource.getRepository(User);
const profileRepository = dataSource.getRepository(Profile);
const postRepository = dataSource.getRepository(Post);

export const create = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { text, image } = req.body; // likes tmb?
    if (!image) {
      return handleErrorResponse(res, "Imagen requerida", 400);
    }

    // hacen falta más comprobaciones?
    // el id del post se genera automáticamente?

    const newPost = new Post();
    newPost.text = text;
    newPost.image = image;
    newPost.likes = 0;

    //const currentUser = await userRepository.findOneBy({ id: id }); //mejorar
    //const currentUserProfile = await profileRepository.findOneBy({ email });

    //currentUser.post = newPost;
    //currentUserProfile.post = newPost;

    await postRepository.save(newPost);
    const savedPost = await postRepository.save(newPost);
    res.json(savedPost);
  } catch (error) {
    handleErrorResponse(res, "Error al crear el post", 500);
  }
};
