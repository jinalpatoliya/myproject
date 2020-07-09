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
      catgeoryDescription:{
        type:Sequelize.STRING
      },
      categoryKeywords:{
        type:Sequelize.STRING
      },
      categryContent:{
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
