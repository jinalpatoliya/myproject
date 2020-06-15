import express from "express";
import { UserModel } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passportConfig from "../config/passport.config.json";
import cookie from 'cookie'
const router = express.Router();

router.post("/register", (req, res) => {
  const body = req.body;

  const user = {
    name: body.name,
    email: body.email,
    password: body.password,
  };
  bcrypt.genSalt(10, (err, salt) => {
    console.log("--------------------")
    console.log(err, salt)
    console.log("--------------------")
    bcrypt.hash(user.password, salt, (err, hash) => {
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
  })
});

router.post("/login", (req, res) => {
  const body = req.body;
  console.log("request Body",req.body);
  UserModel.findOne({
    where: {
      email: body.email,
    }    
  }).then((user) => {
    if(!user)
    {
      return res.status(404).json({ message: "User not found" } )
    }

    console.log(user)     
    console.log("User Password",user.password);
    console.log("Body Password",body.password);


    bcrypt.compare(body.password, user.password, (err, result) => {
      console.log("Compare",result,err);
      if (err) {
        console.log("Enter ?In Error Execute", err);
        return res.status(400).json({ message: "bcrypt error" });
      }
      if (!result) {
        console.log("Enter ?In Error Execute result",result);
        return res.status(400).json({ message: "password does not match" });
      }
      if (result) {
        console.log("No Error");
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        console.log("Token Generate");
        jwt.sign(        
          payload,
          passportConfig.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            // res.setHeader('set-cookie',cookie.serialize('auth',token,{
            //   httpOnly:true,
            //   secure:true,
            //   sameSite:'strict',
            //   maxAge:3600,
            //   path:'/'
            // }))
            return res.status(200).json({
              token: "Bearer " + token,
              Message:"Welcome Back To The App!"
            });
          }
        );
        console.log("Token genrated successfully");
      }
    });
  });
});

export default router;
