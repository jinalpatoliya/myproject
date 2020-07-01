import { Router } from "express";
import { CommentModel } from "../db/index";

const router = Router();

router.post("/id", (req, res) => {
  console.log("Solution Details",req.body)
  const id =req.body.question_id;
  CommentModel.findAll({
    where: {
      question_id:id
  }
  }).then((data) => {
    res.status(200).json(data);
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  console.log("My Solution Details",req.body)
  const comment = {       
    comment:body.comment,
    name:body.name,
    email:body.email,    
    question_id: body.question_id,
  };  
  CommentModel.create(comment).then((data) => {
    res.status(200).json(data);
    // res.status(200).json({"Message":"Solution Successfully Added."});
  });
});

export default router;
