import { Router } from "express";
import { QuestionTblModel } from "../db/index";
import { insertQuestionValidation } from "../validations/question"
import { authenticate } from "../security/passport";
const router = Router();

router.get("/", (req, res) => {
  console.log("All Question Details")
  QuestionTblModel.findAll().then((data) => {
    res.status(200).json(data);
  });
}); 

router.post("/", authenticate(),(req, res) => {
  const body = req.body;
  console.log("My User Details",req.user)
  console.log("My Sub Category Details")
  const { isValid, errors } = insertQuestionValidation(body)
  console.log(isValid, errors)
  console.log("-------------------------")
  console.log(isValid, errors)
  console.log("-------------------------")

  console.log("-------------------------")
  console.log(req.user.id)
  console.log("-------------------------")
  if (!isValid)
    return res.status(404).json(errors);

  const question = {   
    question: body.question,
    optionA: body.optionA,
    optionB: body.optionB,
    optionC: body.optionC,
    optionD: body.optionD,
    answer: body.answer,
    subcategory_id: body.subcategory_id,
    user_id:req.user.id,
  };
  QuestionTblModel.create(question).then((data) => {
    res.status(200).json(data);
  });
});

export default router;
