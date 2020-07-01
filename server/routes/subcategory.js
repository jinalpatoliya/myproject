import { Router } from "express";
import { SubcategoryModel } from "../db/index";
// import { authenticate } from "../security/passport";

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

router.post("/getid", (req, res) => {
  // console.log("Category Auth Details")
  const subcategorySlug = req.body.subcategorySlug;
  SubcategoryModel.findAll({
    where: {
      subcategorySlug: subcategorySlug,
    },
  }).then((data) => {
    res.status(200).json({ id: data[0].id });
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  // console.log("My Sub Category Details");
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
