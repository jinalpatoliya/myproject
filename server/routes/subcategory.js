import { Router } from "express";
import { SubcategoryModel } from "../db/index";

import { insertSubcategoryValidation } from "../validations/subcategory";
import isEmpty from "../validations/is-empty";

const router = Router();

router.get("/category/:catId", (req, res) => {
  const category_id = req.params.catId;
  SubcategoryModel.findAll({
    where: {
      category_id: category_id,
    },
  }).then((data) => {

    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  const { isValid, errors } = insertSubcategoryValidation(body);
  if (!isValid) return res.status(404).json(errors);

  const subcategory = {
    subcategoryName: body.subcategoryName,
    category_id: body.category_id,
    subcategorySlug: body.subcategorySlug,
  };

  SubcategoryModel.findOne({
    where: {
      subcategoryName: body.subcategoryName,
    },
  })
    .then((subcategoryData) => {
      console.log("---------------");
      console.log("Category Data", subcategoryData);
      console.log("---------------");
      if (!isEmpty(subcategoryData)) {
        console.log("Come If Part");
        return res.status(409).json({ Message: "Category already exist" });
      }
      console.log("Come else Part");
      SubcategoryModel.create(subcategory)
        .then((subcategorydata) => {          
          res.status(200).json({ Message: "Category Successfully Added." });
        })
        .catch((error) =>
          res.status(500).json({ error: error })
        );
    })
    .catch((error) =>
      res.status(500).json({ error: error })
    );
});

export default router;
