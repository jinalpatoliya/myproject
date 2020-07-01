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
      // slug: {
      //   type: Sequelize.VIRTUAL,
      //   unique: true,
      //   get() {
      //     return this.get('categoryName') && this.get('categoryName').split(' ')[0].replace('-');
      //   },
      // }        
    },
    {
      freezeTableName: true,
      underscored: true,
    }
  );

  // SequelizeSlugify.slugifyModel(table, {
  //   source: ['categoryName'],
  //   slugOptions: { lower: true },
  //   overwrite: false,
  //   column: 'slug',
  //   incrementalReplacement: '-',
  // });

  return table;
};

export default Category;
