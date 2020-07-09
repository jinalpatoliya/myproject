import Sequelize from "sequelize";
// import SequelizeSlugify from 'sequelize-slugify';

const Category = (sequelizeDB) => {
  const table = sequelizeDB.define(
    "category",
    {
      categoryName: {
        type: Sequelize.STRING
      }, 
      categorySlug:{
        type: Sequelize.STRING        
      },
      categoryTitle:{
        type:Sequelize.STRING
      },
      categoryDescription:{
        type:Sequelize.STRING(800)
      },
      categoryKeyword:{
        type:Sequelize.STRING(500)
      },
      categoryContent:{
        type:Sequelize.TEXT
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
