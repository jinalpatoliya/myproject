
import { Router } from "express";
import { MainCategoryMappingModel } from "../db/index";



const router = Router();

router.get("/", (req, res) => {
    MainCategoryMappingModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});

export default router;
