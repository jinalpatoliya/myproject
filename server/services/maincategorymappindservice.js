import { MainCategoryMappingModel } from "../db";

export const getCategoryMappingData = (id) => {
  return new Promise((resolve, reject) => {
    MainCategoryMappingModel.findAll({
      where: {
        main_category_id: id,
      },
    })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
