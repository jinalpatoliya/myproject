import { Router } from "express";
import { MainCategoryMappingModel, CategoryModel } from "../db/index";
import { insertMainCategoryMappingValidation } from "../validations/maincategorymapping";

const router = Router();

router.get("/", (req, res) => {
  MainCategoryMappingModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log("My Route Array", body);

  const data = [];
  for (const item of body) {
    const temp = {};
    temp.main_category_id = item.mainCategoryId;
    temp.category_id = item.categoryId;
    data.push(temp);
  }
  // const { isValid, errors } = insertMainCategoryMappingValidation(data);
  // if (!isValid) return res.status(404).json(errors);

  MainCategoryMappingModel.bulkCreate(data)
    .then((data) => {
      // res.status(200).json(categorydata);
      res
        .status(200)
        .json({ Message: "Main Category Mapping Successfully Added." });
    })
    .catch((error) => res.status(500).json({ error: error }));
});

router.get("/maincategory/:maincategoryId", (req, res) => {
  const main_category_id = req.params.maincategoryId;
  console.log("Route main cat id", main_category_id);
  MainCategoryMappingModel.findAll({
    where: {
      main_category_id: main_category_id,
    },
  })
    .then((category) => {
      // console.log("*******************");
      // // console.log("Category Id Route", category);
      // console.log("id",category.maincategorymapping.dataValues.category_id)
      // console.log("Id",category.category_id)
      // console.log("*******************");
      // CategoryModel.findAll({
      //   where: {
      //     // id: category.category_id,
      //   },
      // })
      //   .then((data) => {
          res.status(200).json(category);
        })
        .catch((error) => res.status(500).json({ error: error }));
    // })
    // .catch((error) => res.status(500).json({ error: error }));
});
export default router;
