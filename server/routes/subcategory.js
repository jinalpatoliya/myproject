import { Router } from "express";
import { SubcategoryModel, CategoryModel } from "../db/index";

import { insertSubcategoryValidation } from "../validations/subcategory";
import isEmpty from "../validations/is-empty";


const router = Router();

router.get("/", (req, res) => {
    SubcategoryModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});


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

router.get("/:catId", (req, res) => {
  const subcategory_id = req.params.catId;
  SubcategoryModel.findOne({
    where: {
      id: subcategory_id,
    },
  }).then((data) => {
    res.status(200).json(data);
  });
});
// router.get("/category/:categorySlug", async (req, res) => {
//   console.log("Coming Route");
//   const categorySlug = req.params.categorySlug;
//   console.log("Catgeory Slug", categorySlug);
//   const categroryId = await getCategoryIdByCategorySlug(categorySlug);
//   console.log("Category Id", categroryId);
//   SubcategoryModel.findAll({
//     where: {
//       category_id: categoryId,
//     },
//   })
//     .then((data) => {
//       console.log("Data ------",data)
//       res.status(200).json(data);
//     })
//     .catch((error) => res.status(500).json({ error: error }));
// });

router.get("/categoryslug/:catslug", (req, res) => {  
  console.log("WElcom eRtregjdfjk")
  const { catslug } = req.params;
  console.log("Category Slug",catslug)
  CategoryModel.findOne({
    where: {
      categorySlug: catslug,
    },
  }).then((category) => {     
      SubcategoryModel.findAll({
        where: {          
          category_id: category.id,
        },
      }).then((subCategory) => { 
           res.status(200).json(subCategory);
        })
        .catch((err) => res.status(500).json({ error: err }));
     });
    })
router.post("/", (req, res) => {
  const body = req.body;

  const { isValid, errors } = insertSubcategoryValidation(body);
  if (!isValid) return res.status(404).json(errors);

  const subcategory = {
    subcategoryName: body.subcategoryName,
    category_id: body.category_id,
    subcategorySlug: body.subcategorySlug,
    subcategoryTitle:body.subcategoryTitle,
    subcategoryDescription:body.subcategoryDescription,
    subcategoryKeyword:body.subcategoryKeyword,
    subcategoryContent:body.subcategoryContent
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
        .catch((error) => res.status(500).json({ error: error }));
    })
    .catch((error) => res.status(500).json({ error: error }));
});




router.put("/:id",(req, res) => {
  const id = req.params.id;
  const body = req.body;
  SubcategoryModel.update(
    {
      subcategoryName: body.subcategoryName,
      category_id: body.category_id,
      subcategorySlug: body.subcategorySlug,
      subcategoryTitle:body.subcategoryTitle,
      subcategoryDescription:body.subcategoryDescription,
      subcategoryKeyword:body.subcategoryKeyword,
      subcategoryContent:body.subcategoryContent
    },
    {
      where: {
        id: id,
      },
    }
  ).then((data) => {
    // res.status(200).json(data);
    res.status(200).json({"Message":"Sub Category Successfully Edited."});
  })  .catch((error) => res.status(500).json({ "Message": "Error For Edit Sub Category Data." }));
});
export default router;
