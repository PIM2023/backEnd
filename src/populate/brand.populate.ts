import { Like } from "typeorm";
import { AppDataSource as dataSource } from "../data-source";
import { Brand } from "../entity/Brand";

const brandRepository = dataSource.getRepository(Brand);

const populate = async () => {
  const brands = [];

  for (let brand of brands) {
    const existingGender = await brandRepository.findOne({
      where: { name: Like(`%${brand.name}%`) },
    });
    if (!existingGender) {
      let newBrand = new Brand();
      newBrand.name = brand.name;

      await brandRepository.save(newBrand);
    }
  }
};

populate();
