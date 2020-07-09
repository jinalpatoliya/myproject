import { Router } from "express";
import {
  MainCategoryMappingModel,
  CategoryModel,
  MaincategoryModel,
} from "../db/index";
import { insertMainCategoryMappingValidation } from "../validations/maincategorymapping";
import Maincategory from "../models/maincategory";
import { getMainCategoryData } from "../services/maincategoryservice";
import { getCategoryMappingData } from "../services/maincategorymappindservice";
import { getCategoryById } from "../services/categoryservice";

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

router.get("/maincategory", async (req, res) => {
  // const main_category_id = req.params.maincategoryId;
  console.log("Route main Entre Mapping Main cat");
  let data = [];
  const mainCategoryList = await getMainCategoryData(); // List of main categories
  for (let index = 0; index < mainCategoryList.length; index++) {
    const obj = {};
    const item = mainCategoryList[index];
    // item : only category
    obj.mainCategoryName = item.mainCategoryName
    obj.categoryList = []
    const mainCategoryMappingList = await getCategoryMappingData(item.id);
    if (mainCategoryMappingList.length > 0) {
      for (const mappingListItem of mainCategoryMappingList) {
        // mappingListItem : main category id related category list
        const category = await getCategoryById(mappingListItem.category_id);
        //catgory : category id  and related data`
        obj.categoryList.push(category);
      }
    }
    data.push(obj)
  }
  res.status(200).json(data);
});

export default router;
