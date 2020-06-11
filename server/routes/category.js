import { Router } from "express";
import { CategoryModel } from "../db/index";
// import { authenticate } from "../security/passport";

const router = Router();

router.get("/", (req, res) => {
  console.log("Category Auth Details")
  CategoryModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log("My Details")
  const category = {    
    categoryName: body.categoryName    
  };
  CategoryModel.create(category).then((data) => {
    res.status(200).json(data);
  });
});

export default router;
