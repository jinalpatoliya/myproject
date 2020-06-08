import dbConfig from "../config/db.config.json";
import Sequelize from "sequelize";
import Task from "../models/task";
import User from "../models/user";

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

sequelize.sync().then(() => {
  console.log("---------------Tables Created--------------");
});
