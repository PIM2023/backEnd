import { Like } from "typeorm";
import { AppDataSource as dataSource } from "../data-source";
import { Color } from "../entity/Color";

const colorRepository = dataSource.getRepository(Color);

const populate = async () => {
  const colors = [];

  for (let color of colors) {
    const existingGender = await colorRepository.findOne({
      where: { name: Like(`%${color.name}%`) },
    });
    if (!existingGender) {
      let newGender = new Color();
      newGender.name = color.name;

      await colorRepository.save(newGender);
    }
  }
};

populate();
