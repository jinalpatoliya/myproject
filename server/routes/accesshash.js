import { Router } from "express";
import { AccessHashModel } from "../db/index";

const router = Router();

router.get("/", (req, res) => {
    AccessHashModel.findAll().then((data) => {
    res.status(200).json(data);
  });
});
export default router;