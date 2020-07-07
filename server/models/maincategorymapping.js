import Sequelize from "sequelize";
import { CategoryModel, MaincategoryModel } from "../db";
// import Category from "./category";
// import Maincategory from "./maincategory";

const MainCategoryMapping = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "maincategorymapping",
    {
      main_category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "maincategory",
          key: "id",
        },
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "category",
          key: "id",
        },
      },
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );
  // Category.belongsToMany(Category, { through: MainCategoryMapping })
  // Maincategory.belongsToMany(Maincategory, { through: MainCategoryMapping })
  return table;
};

export default MainCategoryMapping;
