import express from "express";
import { UserModel, PendingUserModel } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passportConfig from "../config/passport.config.json";

import isEmpty from "../validations/is-empty";
import { insertSignupValidation } from "../validations/signup";
import { useParams } from "react-router-dom";

const router = express.Router();

router.put('forgetpassword',async(req,res)=>{
  const body = req.body;
  const userf = {
    email:body.email
    // password:body.password
  }
  UserModel.findOne({
    where:{
    email:userf.email
    }
  }).then((user)=>{
    if(!user){
      return res.status(400).json({ error : "User with this email does not exists."})      
    }
    const token = jwt.sign({id:user.id},process.env.RESET_PASSWORD_KEY,{expiredIn:'20m'});
    const data={
      from:process.env.GOOGLE_USER,
      to:userf.email,
      subject:'Account Activation Link',
      html:`
        <h2>Please click on giver link to reset your password.</h2>
        <p>${process.env.DOMAIN}/resetpassword/${token}</p>
      `
    }
    return  UserModel.update({
      resetlink:token
    },{
      where:{
        email:user.email
      }
    }).then((error,usr)=>{
      if(error){
        return res.status(400).json({error:'Reset Password Link Error.'})
      }
      else{
        return res.status(200).json({message:'Reset Password Link Sent To Yout mail id.'})
      }
    })
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(user.password, salt, (err, hash) => {
    //     if (err) {
    //       return res.status(400).json({ message: "bcrypt error" });
    //     }
        // user.password = hash;
        // UserModel.update({
        //   password:userf.password
        // },
        // {
        //   where: {
        //     email: userf.email,
        //   },
        // }
        // )
        //   .then((user) => {
        //     res.status(200).json({ name: user.name, email: user.email });
        //   })
        //   .catch((err) =>
        //     console.log({ Message: "Try Again Something Wrong !" })
        //   );


  })
})
router.get("/:id", async(req, res) => {
  const id = req.params.id;  
    PendingUserModel.findOne({
    where: {
      id
    },
  }).then((data) => {
    // res.status(200).json(data);
    if(data){
      const newUser={
        name: data.name,
        email: data.email,
        password: data.password,
      }
      UserModel.create(newUser)
          .then((nuser) => {
            res.status(200).json({ name: nuser.name, email: nuser.email });
          })
          .catch((err) =>
            console.log({ Message: "Try Again Something Wrong !" })
          );
    }
  });
    res.status(200).json({message: `User ${hash} has been activated`})
  // } 
  
  // res.json({message: `User ${id} has been activated`})
});

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
          { expiresIn: 86400 },
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
