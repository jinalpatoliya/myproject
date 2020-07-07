import { Router } from "express";
import { MaincategoryModel } from "../db/index";
import { insertMainCategoryValidation } from "../validations/maincategory";
import isEmpty from "../validations/is-empty";

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

  const maincategory = {
    mainCategoryName: body.mainCategoryName,
    mainCategorySlug: body.mainCategorySlug,
    mainCategoryTitle: body.mainCategoryTitle,
  };
  console.log("Main Castegory Data", maincategory);
  MaincategoryModel.findOne({
    where: {
      mainCategoryName: body.mainCategoryName,
    },
  })
    .then((maincategoryData) => {
      console.log("==================");
      console.log("Main Category Then Coming", maincategoryData);
      console.log("==================");
      if (!isEmpty(maincategoryData)) {
        return res.status(409).json({ Message: "Main Category already exist" });
      }
      MaincategoryModel.create(maincategory)
        .then((maincategorydata) => {
          res
            .status(200)
            .json({ Message: "Main Category Successfully Added." });
        })
        .catch((error) => res.status(500).json({ error: "Inner Error" }));
    })
    .catch((error) => res.status(500).json({ error }));
});

export default router;
