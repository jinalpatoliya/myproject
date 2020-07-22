import Sequelize from "sequelize";

const Subcategory = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "subcategory",
    {
      subcategoryName: {
        type: Sequelize.STRING,
      },
      subcategorySlug: {
        type: Sequelize.STRING,
        // unique:true
      },
      subcategoryTitle: {
        type: Sequelize.STRING,
      },
      subcategoryDescription: {
        type: Sequelize.STRING(500),
      },
      subcategoryKeyword: {
        type: Sequelize.STRING(800),
      },
      subcategoryContent: {
        type: Sequelize.TEXT,
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

export default Subcategory;
