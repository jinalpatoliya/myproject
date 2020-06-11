import Sequelize from "sequelize";

const Category = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "category",
    {
      categoryName: {
        type: Sequelize.STRING,
      },         
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  return table;
};

export default Category;
