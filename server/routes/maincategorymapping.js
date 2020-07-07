import { Router } from "express";
import { MainCategoryMappingModel } from "../db/index";
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
    .then((category) => {
      console.log(category); // ... in order to get the array of user objects
    })
    //   .then((data) => {
    //     // res.status(200).json(categorydata);
    //     res.status(200).json({"Message":"Category Successfully Added."});

    //  })
    .catch((error) => res.status(500).json({ error: error }));
});
export default router;
