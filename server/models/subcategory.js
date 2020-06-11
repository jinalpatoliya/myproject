  import Sequelize from "sequelize";

const Subcategory = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "subcategory",
    {
      subcategoryName: {
        type: Sequelize.STRING,
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
