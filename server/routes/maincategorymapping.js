import { Router } from "express";
import {
  MainCategoryMappingModel,
  CategoryModel,
  MaincategoryModel,
} from "../db/index";
import { insertMainCategoryMappingValidation } from "../validations/maincategorymapping";
import Maincategory from "../models/maincategory";

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

  MaincategoryModel.findAll().then((mainCategoryList) => {
    mainCategoryList.forEach((item) => {
      console.log("*****************")
      console.log("Item id :",item.id)
      console.log("*****************")
      MainCategoryMappingModel.findAll({
        where: {
          main_category_id: item.id,
        },
      })
        .then((mainCategoryMappingList) => {
          mainCategoryMappingList.forEach(mainCategoryMappingListItem => {
            console.log("*****************")
            console.log("mainCategoryMappingListItem.category_id:",mainCategoryMappingListItem.category_id)
            console.log("*****************")
            CategoryModel.findOne({
              where: {
                id: mainCategoryMappingListItem.category_id
              }
            }).then(category => {
              res.status(200).json(category);
            })  .catch((error) => res.status(500).json({ error: error }));
          })  .catch((error) => res.status(500).json({ error: error }));         
         
        }).catch((error) => res.status(500).json({ error: error }));     
    });
  }) .catch((error) => res.status(500).json({ error: error }));;
});
export default router;
