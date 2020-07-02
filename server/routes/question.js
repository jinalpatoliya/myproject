import { Router } from "express";
import { QuestionModel, CategoryModel, SubcategoryModel } from "../db/index";
import { insertQuestionValidation } from "../validations/question";
import { authenticate } from "../security/passport";
import isEmpty from "../validations/is-empty";
import Subcategory from "../models/subcategory";
const router = Router();

router.post("/", authenticate(), (req, res) => {
  const body = req.body;
  console.log("My User Details", req.user);
  console.log("My Sub Category Details");
  const { isValid, errors } = insertQuestionValidation(body);
  console.log(isValid, errors);
  console.log("-------------------------");
  console.log(isValid, errors);
  console.log("-------------------------");

  console.log("-------------------------");
  console.log(req.user.id);
  console.log("-------------------------");
  if (!isValid) return res.status(404).json(errors);

  const question = {
    question: body.question,
    optionA: body.optionA,
    optionB: body.optionB,
    optionC: body.optionC,
    optionD: body.optionD,
    answer: body.answer,
    category_id: body.category_id,
    subcategory_id: body.subcategory_id,
    user_id: req.user.id,
  };
  QuestionModel.create(question).then((data) => {
    res.status(200).json(data);
  });
});

router.get("/", (req, res) => {
  console.log("All Question Details");
  QuestionModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

router.get("/:id", (req, res) => {
  console.log("Id Comming From : ", req.params.id);
  const id = req.params.id;
  QuestionModel.findOne({
    where: {
      id: id,
    },
  }).then((data) => {
    res.status(200).json(data);
  });
});

router.put("/:id", authenticate(), (req, res) => {
  console.log("Data Coming to route", req.body);
  const id = req.params.id;
  const body = req.body;
  QuestionModel.update(
    {
      question: body.question,
      optionA: body.optionA,
      optionB: body.optionB,
      optionC: body.optionC,
      optionD: body.optionD,
      answer: body.answer,
      subcategory_id: body.subcategory_id,
      category_id: body.category_id,
    },
    {
      where: {
        id: id,
      },
    }
  ).then((data) => {
    res.status(200).json(data);
  });
});

router.post("/subcate/:subcatId", (req, res) => {
  console.log("Id Comming From shfdgsjgfsd : ", req.params.subcatId);
  const id = req.params.subcatId;
  QuestionModel.findAll({
    where: {
      subcategory_id: id,
    },
  }).then((data) => {
    res.status(200).json(data);
  });
});

router.post("/questionperpage", (req, res) => {
  console.log("Enter Question Per Page", req.body);
  // console.log("My Query Getting Value",req.query)
  const id = req.body.subcategory_id;
  const pageNum = req.body.pageNum;
  QuestionModel.findAndCountAll({
    where: {
      subcategory_id: id,
    },
    limit: 1,
    offset: pageNum * 1,
    // order: [['id', 'ASC']],
    // ...params,
  }).then((data) => {
    res.status(200).json(data);
  });
  // QuestionModel
  //   .findAndCountAll({
  //     // where: {...},
  //     // order: [...],
  //     limit: 1,
  //     offset: 0,
  // })
  // .findAll()
  // .then((data)=>{
  //     res.status(200).json(data);
  //   })
});

router.get("/slug/:catslug/subslug/:subslug", (req, res) => {
  console.log("Enter Question Per Page", req.query);
  const pageNum = req.query.pageNum;
  const { catslug, subslug } = req.params;

  CategoryModel.findOne({
    where: {
      categorySlug: catslug,
    },
  })
    .then((category) => {
      if (isEmpty(category)) {
        res.status(404).json({ meg: "Category not found" });
        return;
      }
      SubcategoryModel.findOne({
        where: {
          subcategorySlug: subslug,
          category_id: category.id,
        },
      })
        .then((subCategory) => {
          if (isEmpty(subCategory)) {
            res.status(404).json({ meg: "Subcategory not found" });
            return;
          }
          QuestionModel.findAndCountAll({
            where: {
              subcategory_id: subCategory.id,
            },
            limit: 1,
            offset: pageNum * 1,
          })
            .then((data) => {
              res.status(200).json(data);
            })
            .catch((err) => res.status(500).json({ error: err }));
        })
        .catch((err) => res.status(500).json({ error: err }));
    })
    .catch((err) => res.status(500).json({ error: err }));
});

export default router;
