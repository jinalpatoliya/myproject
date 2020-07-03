import { Router } from "express";
import { CategoryModel } from "../db/index";
import { insertCategoryValidation } from "../validations/category";

const router = Router();

router.get("/", (req, res) => {
  console.log("Category Auth Details")
  CategoryModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body; 
  const { isValid, errors } = insertCategoryValidation(body);  
  if (!isValid) return res.status(404).json(errors);

   
  console.log("My Details",req.body)
  const categoryName = {    
    categoryName: body.categoryName,
    categorySlug:body.categorySlug
  };  
  CategoryModel.create(categoryName).then((data) => {
    // res.status(200).json(data);
    res.status(200).json({"Message":"Category Successfully Added."});
  });
});

export default router;
