import { Router } from "express";
import { CategoryModel } from "../db/index";

import { insertCategoryValidation } from "../validations/category";
import isEmpty from "../validations/is-empty";


const router = Router();

router.get("/", (req, res) => {
  CategoryModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const { isValid, errors } = insertCategoryValidation(body);
  if (!isValid) return res.status(404).json(errors);
  
  const category = {    
        categoryName: body.categoryName,
        categorySlug:body.categorySlug,
        categoryTitle:body.categoryTitle,
        categoryDescription:body.catgeoryDescription,
        categoryKeyword:body.categoryKeywords,
        categoryContent:body.categoryContent,
  };  

  CategoryModel.findOne({
    where: {
      categoryName: body.categoryName,
    },
  }).then((categoryData) => {
    console.log("---------------")
    console.log("Category Data",categoryData)
    console.log("---------------")
    if (!isEmpty(categoryData)) {
      console.log("Come If Part")
      return res.status(409).json({ Message: "Category already exist" });
    }
    console.log("Come else Part")
    CategoryModel.create(category)
                 .then((categorydata) => {
                    // res.status(200).json(categorydata);
                    res.status(200).json({"Message":"Category Successfully Added."});
   
                 })
                 .catch((error) => res.status(500).json({ error: "Error Coming From inner Side" }));
}).catch((error) => res.status(500).json({ error: "Error Coming From Outer Exist Side" }));
});
router.get("/:catId", (req, res) => {
  const category_id = req.params.catId;
  CategoryModel.findOne({
    where: {
      id: category_id,
    },
  }).then((data) => {
    res.status(200).json(data);
  });
});



router.put("/:id",(req, res) => {
  const body = req.body;
  const id = req.params.id;

  const { isValid, errors } = insertCategoryValidation(body);
  if (!isValid) return res.status(404).json(errors);  
  
  CategoryModel.update(
    {
      categoryName: body.categoryName,
      categorySlug:body.categorySlug,
      categoryTitle:body.categoryTitle,
      categoryDescription:body.categoryDescription,
      categoryKeyword:body.categoryKeyword,
      categoryContent:body.categoryContent,
    },
    {
      where: {
        id: id,
      },
    }
  ).then((data) => {
    // res.status(200).json(data);
    res.status(200).json({"Message":"Category Successfully Edited."});
  })  .catch((error) => res.status(500).json({ "Message": "Error For Edit Category Data." }));
});
export default router;
