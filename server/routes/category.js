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
  console.log("My Details",req.body)
  const categoryName = {    
    categoryName: body.categoryName
  };  
  CategoryModel.create(categoryName).then((data) => {
    // res.status(200).json(data);
    res.status(200).json({"Message":"Category Successfully Added."});
  });
});

export default router;
