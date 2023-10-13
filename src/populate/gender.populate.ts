import { Like } from "typeorm";
import { AppDataSource as dataSource } from "../data-source";
import { Gender } from "../entity/Gender";

const genderRepository = dataSource.getRepository(Gender);

const populate = async () => {
  const genders = [
    { name: "Masculino" },
    { name: "Femenino" },
    { name: "Unisex" },
  ];

  for (let gender of genders) {
    const existingGender = await genderRepository.findOne({
      where: { name: Like(`%${gender.name}%`) },
    });
    if (!existingGender) {
      let newGender = new Gender();
      newGender.name = gender.name;

      await genderRepository.save(newGender);
    }
  }
};

populate();
