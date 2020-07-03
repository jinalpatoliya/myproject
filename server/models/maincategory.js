import Sequelize from "sequelize";

const Maincategory = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "maincategory",
    {
      mainCategoryName: {
        type: Sequelize.STRING,
      }, 
      mainCategorySlug:{
        type: Sequelize.STRING
        // unique:true
      },
      mainCategoryTitle:{
        type: Sequelize.STRING
        // unique:true
      }          
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  return table;
};

export default Maincategory;
