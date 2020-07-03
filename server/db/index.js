import dbConfig from "../config/db.config.json";
import Sequelize from "sequelize";
import Task from "../models/task";
import User from "../models/user";
import Category from "../models/category"
import Subcategory from "../models/subcategory"
import Question from "../models/question"
import Comment from "../models/comment";
import Maincategory from "../models/maincategory"

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false, 
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

export default sequelize;

// import all models here

export const TaskModel = Task(sequelize);
export const UserModel = User(sequelize);
export const CategoryModel = Category(sequelize);
export const SubcategoryModel = Subcategory(sequelize);
export const CommentModel = Comment(sequelize);
export const QuestionModel = Question(sequelize);
export const MaincategoryModel = Maincategory(sequelize)

sequelize.sync().then(() => {
  console.log("---------------Tables Created--------------");
});
