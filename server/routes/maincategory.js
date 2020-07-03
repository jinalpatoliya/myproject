import { Router } from "express";
import { MaincategoryModel } from "../db/index";
import { insertCategoryValidation } from "../validations/category";
import { insertMainCategoryValidation } from "../validations/maincategory";


const router = Router();

router.get("/", (req, res) => {  
    MaincategoryModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body; 
  const { isValid, errors } = insertMainCategoryValidation(body);  
  if (!isValid) return res.status(404).json(errors);

   
  console.log("My Details",req.body)
  const MainCategory = {    
    mainCategoryName: body.mainCategoryName,
    mainCategorySlug:body.mainCategorySlug,
    mainCategoryTitle:body.mainCategoryTitle
  };  
  MaincategoryModel.create(MainCategory).then((data) => {
    // res.status(200).json(data);
    res.status(200).json({"Message":"Category Successfully Added."});
  });
});

export default router;
