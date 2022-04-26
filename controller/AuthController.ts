import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users";
import { HandleResponse } from "../HandleResponse";
const key = process.env.SECRET_KEY || "secret";
class AuthController {
  static async LoginWithNumber(req, res) {
    const { phone_number, password } = req.body;
    await Users.findOne({phone_number}).then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            userId: user._id,
            email: user.email,
            full_name: user.full_name,
          };
          let token = jwt.sign(payload, key);
          HandleResponse(res, 200, `Login Successful`, "success", token)
          // res.json(token);
        } else {
          HandleResponse(res, 200, `Passwords do not match`, "error", {})
          // res.json({ error: "Passwords do not match" });
        }
      } else {
        HandleResponse(res, 200, `No user with that phone number`, "error", {})
        // res.json({
          //   error: "User does not exist",
          // });
        }
      });
    }
    static async LoginWithEmail(req, res) {
      const { email, password } = req.body;
      await Users.findOne({email}).then((user) => {
        if (user) {
          if (bcrypt.compareSync(password, user.password)) {
            const payload = {
              userId: user._id,
              email: user.email,
              full_name: user.full_name,
            };
            let token = jwt.sign(payload, key);
            HandleResponse(res, 200, `Login Successful`, "success", token)
            // res.json(token);
          } else {
            HandleResponse(res, 200, `Passwords do not match`, "error", {})
            // res.json({ error: "Passwords do not match" });
          }
        } else {
          HandleResponse(res, 200, `No user with that email address`, "error", {})
      }
    });
  }
  // static async UpdateAccount(req, res) {
  //   const { matric } = req.params;
  //   const {password} = req.body
  //   bcrypt.hash(password, 10, (err, hash) => {
  //           Users.findOneAndUpdate({matric}, {
  //             $set: {password: hash}
  //         }, {
  //             new: true,
  //             runValidators: true,
  //             upsert: true,
  //             returnOriginal: false,
  //             returnNewDocument: true
  //         }).exec()
  //         .then((user)=>{
  //           HandleResponse(res, 201, "Account Updated Successfully", user)
  //         })
  //         })
  // }
  static async CreateAccount(req, res) {
    const { 
      email,
      phone_number,
      password,
      referral_code
     } = req.body;
    const NewUser = {
      email,
      phone_number,
      password,
      referral_code,
    };
    await Users.findOne({email})
      .then((user) => {
        if (user) {
          console.log(user);
          HandleResponse(res, 200, `${email} exists already`, "error", user)
        }
        if (!user) {
          // console.log(users)
          bcrypt.hash(password, 10, (err, hash) => {
            NewUser.password = hash
            Users.create(NewUser).then(() => {
              HandleResponse(res, 200, `${email} added to the user list successfully`, "success", NewUser)
            });
          }
          )
        }
      })
      .catch((err) => {
        res.send("error" + err);
      });
  }
  static async GetUsers(req, res) {
    // var decode = jwt.verify(req.headers['authorization'], key)
    // res.json({user: decode})
    await Users.find().then(users=>{
      console.log(users)
      users && res.json({message: "All users Retrieved Successfully", data: users, total: users.length})
      !users && res.json({message: "Unexpected Error"})
    })
  }
}
export default AuthController;
