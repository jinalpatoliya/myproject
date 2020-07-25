import express from "express";
import { PendingUserModel } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passportConfig from "../config/passport.config.json";

import isEmpty from "../validations/is-empty";
import { insertSignupValidation } from "../validations/signup";
import sendConfirmationEmail from "../mailer";
// import sendConfirmationEmail from '../mailer'

const router = express.Router();

router.post("/register",async (req, res) => {
  // const { name , email , password} = req.body
  const body = req.body;

  const { isValid, errors } = insertSignupValidation(body);
  if (!isValid) return res.status(404).json(errors);

  const user = {
    name: body.name,
    email: body.email,
    password: body.password,
  };

  PendingUserModel.findOne({
    where: {
      email: user.email,
    },
  }).then((userData) => {
    if (!isEmpty(userData)) {
      return res.status(409).json({ msg: "User is already registered." });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return res.status(400).json({ message: "bcrypt error" });
        }
        user.password = hash;
        PendingUserModel.create(user)
          .then(async(user) => {
            // res.status(200).json({ name: user.name, email: user.email });
            await sendConfirmationEmail({toUser : user , hash:user.id})
            res.status(200).json({ message : "You have been registered , check your email address."})
          })
          .catch((err) =>
            console.log(err)
          );
      });
    });
  });
});

export default router;
