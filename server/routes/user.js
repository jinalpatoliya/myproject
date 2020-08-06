import express from "express";
import { UserModel, PendingUserModel, AccessHashModel } from "../db/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import passportConfig from "../config/passport.config.json";
import isEmpty from "../validations/is-empty";
import { insertSignupValidation } from "../validations/signup";
import sendConfirmationEmail from "../mailer";

const router = express.Router();

router.post("/forgetpassword", async (req,res)=>{
  const email = req.body.email;
  console.log("+++++++++++++++++")
  console.log("Email Id",email)
  console.log("+++++++++++++++++")
  try{    
      const user = await getUserData(email)
      console.log("User Data",user)
      if(!user){
        return res.status(422).send({message:"User Does Not Exist."})
      }
      const hasHash = await gethasHash(user.id)     
        if(hasHash){
        return res.status(422).send("Email to reset password is already Sent !.");
        }
        // AccessHashModel.create(isHash)
        // .then((createHash)=>{
        //   return res.status(200).send({message:"Please Check Your Email To Reset Password ."});
        // })      
  }
  catch{
    return res.status(422).send("Ooops, something went wrong!");
  }
})


export const getUserData = (email) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({
      where:{
        email:email
      }
    })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const gethasHash = (id) => {
  return new Promise((resolve, reject) => {
    AccessHashModel.findOne({
      where:{
        id:id
      }
    })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};




router.get("/:id", async(req, res) => {
  const id = req.params.id;  
    UserModel.update(
      {
        pendingstatus:1
    },
    {
      where: {
      id
    }
  }).then((data) => {
    res.json({message: `User ${id} has been activated`})
    // res.status(200).json({ Message : data });
    // if(data){
    //   const newUser={
    //     name: data.name,
    //     email: data.email,
    //     password: data.password,
    //   }
    //   PendingUserModel.destroy({
    //     where: {
    //        id
    //     }
    //  })
    //   UserModel.create(newUser)
    //       .then((nuser) => {
    //         res.status(200).json({ name: nuser.name, email: nuser.email });
    //       })
    //       .catch((err) =>
    //         console.log({ Message: "Try Again Something Wrong !" })
    //       );
         
    // }
  });
    // res.status(200).json({message: `User ${hash} has been activated`})
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
      return res.status(422).json({ msg: "User is already registered." });
    }
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          return res.status(400).json({ message: "bcrypt error" });
        }
        user.password = hash;
        UserModel.create(user)
          .then(async(user) => {
            // res.status(200).json({ name: user.name, email: user.email });
            await sendConfirmationEmail({toUser : user , hash:user.id})
            res.status(200).json({ message : "You have been registered , check your email address."})
          })
          .catch((err) =>
            console.log({ Message: "Try Again Something Wrong !" })
            // res.status(422).json({msg:err})
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
      pendingstatus:1
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ message: "User not found Or Requeste May be pending." });
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
          role:user.role          
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
