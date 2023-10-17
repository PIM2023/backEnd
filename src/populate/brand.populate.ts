import { AppDataSource as dataSource } from "../data-source";
import { Brand } from "../entity/Brand";

const brandRepository = dataSource.getRepository(Brand);

const populate = async () => {
  const brands = [];

  for (let brand of brands) {
    const existingGender = await brandRepository.findOne({
      where: { brandCode: brand.code },
    });
    if (!existingGender) {
      let newBrand = new Brand();
      newBrand.brandCode = brand.code;
      newBrand.name = brand.name;

      await brandRepository.save(newBrand);
    }
  }
};

populate();
