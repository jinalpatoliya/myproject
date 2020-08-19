import { Router } from "express";
import { QuestionModel, CategoryModel, SubcategoryModel } from "../db/index";
import { insertQuestionValidation } from "../validations/question";
import { authenticate } from "../security/passport";
import isEmpty from "../validations/is-empty";
// import Subcategory from "../models/subcategory";
// import multer from 'multer';
// const upload = multer({dest:'../../static/images'});
import fs from 'fs'
import mime from 'mime'
import base64Img from 'base64-img';
const router = Router();

router.post("/", authenticate(),(req, res) => {
  const body = req.body;
  console.log("%%%%%%%%%%%%%%%%%%%%")
  console.log("req file",req.file)
  console.log("==================================")
  console.log("Req Body",req.body)
  console.log("%%%%%%%%%%%%%%%%%%%%")
  const { isValid, errors } = insertQuestionValidation(body);
  if (!isValid) return res.status(404).json(errors);
  const question = {
    examName:body.examName,
    // image:body.image,
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

router.get("/",  authenticate(), (req, res) => {
  QuestionModel.findAll({
    where:{
      user_id: req.user.id,
    }
  }).then((data) => {
    res.status(200).json(data);
  });
});

router.get("/:id", (req, res) => {
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
  const id = req.params.id;
  const body = req.body;
  QuestionModel.update(
    {
      question: body.question,
      examName:body.examName,
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
  const id = req.body.subcategory_id;
  const pageNum = req.body.pageNum;
  QuestionModel.findAndCountAll({
    where: {
      subcategory_id: id,
    },
    limit: 1,
    offset: pageNum * 1,
  }).then((data) => {
    res.status(200).json(data);
  });
});

router.get("/slug/:catslug/subslug/:subslug", (req, res) => {
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
 
router.get("/questioncheck/:question", (req, res) => {
  const { question } = req.params;  
  console.log("Route Quetsion Come.",question);
  QuestionModel.findAll({
    where: {
      question: question,
    },
  })
    .then((data) => {
      // res.status(200).json(data);
      if (!isEmpty(data)) {
        res.status(200).json({ message: "Question Already Exist." });
        return;
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});



const uploadImage = async (req, res, next) => {
  // to declare some path to store your converted image
  console.log("Coming Value to upload image : ",req.body)
  var data1 = base64Img.base64Sync(`${req.body.base64image}`);
  console.log("Coming Value to upload image : ",data1)
  const matches = data1.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  // const matches = req.body.base64image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  response = {};
   
  if (matches.length !== 3) {
  return new Error('Invalid input string');
  }
   
  response.type = matches[1];
  // response.data = new Buffer(matches[2], 'base64');
  response.data = Buffer.from(matches[2], 'base64');
  
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = mime.getExtension(type);
  const date = new Date();
  const val = date.getTime();
  let fileName = "image." + `${val}` + extension;
  try {
  fs.writeFileSync("./static/images/" + fileName, imageBuffer, 'utf8');
  // path: path.join(__dirname, `../static/images/${id}.png`)
  return res.send({"status":"success"});
  } catch (e) {
  next(e);
  }
  }
   
  router.post('/imageupload', uploadImage)
  

export default router;
