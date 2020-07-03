import { Router } from "express";
import { SubcategoryModel } from "../db/index";
import { insertSubcategoryValidation } from "../validations/subcategory";

const router = Router();

router.get("/category/:catId", (req, res) => {
  console.log("Category Auth Details");
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
  SubcategoryModel.create(subcategory).then((data) => {
    res.status(200).json({ Message: "Sub Category Successfully Added." });
  });
});

export default router;
