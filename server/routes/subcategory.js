import { Router } from "express";
import { SubcategoryModel } from "../db/index";
// import { authenticate } from "../security/passport";

const router = Router();

router.get("/", (req, res) => {
  console.log("Category Auth Details")
  SubcategoryModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log("My Sub Category Details")
  const subcategory = {    
    subcategory_name: body.subcategory_name,
    category_id:body.category_id    
  };
  SubcategoryModel.create(subcategory).then((data) => {
    res.status(200).json(data);
  });
});

export default router;
