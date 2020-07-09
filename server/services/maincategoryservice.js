const { MaincategoryModel } = require("../db");

export const getMainCategoryData = () => {
  return new Promise((resolve, reject) => {
    MaincategoryModel.findAll()
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
