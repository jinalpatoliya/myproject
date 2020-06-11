import { Router } from "express";
import { TaskModel } from "../db/index";
import { authenticate } from "../security/passport";
// const db={}
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.users = require('../models/user')(sequelize, Sequelize);
// db.tasks = require('../models/task')(sequelize, Sequelize);
// db.users.hasMany(db.tasks);
const router = Router();

router.get("/", authenticate(), (req, res) => {
  console.log("Auth Details",req.user.id)
  TaskModel.findAll().then((data) => {
    res.status(200).json(data);
  }); 
});

router.post("/", authenticate(), (req, res) => {
  const body = req.body;
  console.log("My Details",req.user)
  const task = { 
    user_id:req.user.id,
    title: body.title,
    description: body.description,
  };
  TaskModel.create(task).then((data) => {
    res.status(200).json(data);
  });
});

export default router;
