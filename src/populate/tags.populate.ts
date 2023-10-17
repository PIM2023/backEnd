import { Like } from "typeorm";
import { AppDataSource as dataSource } from "../data-source";
import { Brand } from "../entity/Brand";
import { Tag } from "../entity/Tag";

const tagRepository = dataSource.getRepository(Tag);

const populate = async () => {
  const tags = [
    { name: "Invierno" },
    { name: "Verano" },
    { name: "Otoño" },
    { name: "Primavera" },
    { name: "Casual" },
    { name: "Formal" },
    { name: "Deportivo" },
    { name: "Elegante" },
    { name: "Fiesta" },
    { name: "Boda" },
    { name: "Graduación" },
    { name: "Cóctel" },
    { name: "Ceremonia" },
    { name: "Bautizo" },
    { name: "Comunión" },
  ];

  for (let tag of tags) {
    const existingGender = await tagRepository.findOne({
      where: { name: Like(`%${tag.name}%`) },
    });
    if (!existingGender) {
      let newTag = new Brand();
      newTag.name = tag.name;

      await tagRepository.save(newTag);
    }
  }
};

populate();
