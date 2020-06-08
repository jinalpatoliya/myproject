import express from "express";
import { UserModel } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passportConfig from "../config/passport.config.json";

const router = express.Router();

router.post("/register", (req, res) => {
  const body = req.body;

  const user = {
    name: body.name,
    email: body.email,
    password: body.password,
  };

  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      return res.status(400).json({ message: "bcrypt error" });
    }
    user.password = hash;
    UserModel.create(user)
      .then((user) => {
        res.status(200).json({ name: user.name, email: user.email });
      })
      .catch((err) => console.log(err));
  });
});

router.post("/login", (req, res) => {
  const body = req.body;

  UserModel.findOne({
    email: body.email,
  }).then((user) => {
    bcrypt.compare(body.password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "bcrypt error" });
      }
      if (result) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        jwt.sign(
          payload,
          passportConfig.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            return res.status(200).json({
              token: "Bearer " + token,
            });
          }
        );
      }
    });
  });
});

export default router;
