import { Router } from "express";
import { TaskModel } from "../db/index";
import { authenticate } from "../security/passport";

const router = Router();

router.get("/", authenticate(), (req, res) => {
  TaskModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  const task = {
    title: body.title,
    description: body.description,
  };
  TaskModel.create(task).then((data) => {
    res.status(200).json(data);
  });
});

export default router;
