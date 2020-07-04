import express from "express";
import { UserModel } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passportConfig from "../config/passport.config.json";
import isEmpty from "../validations/is-empty";
import { insertSignupValidation } from "../validations/signup";

const router = express.Router();

router.post("/register", (req, res) => {
  const body = req.body;
  const { isValid, errors } = insertSignupValidation(body);
  if (!isValid) return res.status(404).json(errors);

  const user = {
    name: body.name,
    email: body.email,
    password: body.password,
  };

  UserModel.findOne({
    where: {
      email: user.email,
    },
  }).then((userData) => {
    if (!isEmpty(userData)) {
      return res.status(409).json({ msg: "User already exist" });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return res.status(400).json({ message: "bcrypt error" });
        }
        user.password = hash;
        UserModel.create(user)
          .then((user) => {
            res.status(200).json({ name: user.name, email: user.email });
          })
          .catch((err) =>
            console.log({ Message: "Try Again Something Wrong !" })
          );
      });
    });
  });
});
router.post("/login", (req, res) => {
  const body = req.body;
  UserModel.findOne({
    where: {
      email: body.email,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    bcrypt.compare(body.password, user.password, (err, result) => {
      if (err) {
        return res.status(400).json({ message: "bcrypt error" });
      }
      if (!result) {
        return res.status(400).json({ message: "password does not match" });
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
              Message: "Welcome Back To The App!",
            });
          }
        );
      }
    });
  });
});

export default router;
