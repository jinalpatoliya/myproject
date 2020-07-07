import Sequelize from "sequelize";
// import SequelizeSlugify from 'sequelize-slugify';

const Category = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "category",
    {
      categoryName: {
        type: Sequelize.STRING,
      }, 
      categorySlug:{
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

export default Category;
