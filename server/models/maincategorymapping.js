import Sequelize from "sequelize";

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

  return table;
};

export default MainCategoryMapping;
