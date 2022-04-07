import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/Users";
import { HandleResponse } from "../HandleResponse";
const key = process.env.SECRET_KEY || "secret";
class AuthController {
  static async Login(req, res) {
    const { email, password } = req.body;
    // console.log(req.body);
    await Users.findOne({email}).then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const payload = {
            userId: user._id,
            email: user.email,
            full_name: user.full_name,
          };
          let token = jwt.sign(payload, key);
          res.json(token);
        } else {
          res.json({ error: "Passwords do not match" });
        }
      } else {
        res.json({
          error: "User does not exist",
        });
      }
    });
  }
  static async UpdateAccount(req, res) {
    const { matric } = req.params;
    const {password} = req.body
    bcrypt.hash(password, 10, (err, hash) => {
            Users.findOneAndUpdate({matric}, {
              $set: {password: hash}
          }, {
              new: true,
              runValidators: true,
              upsert: true,
              returnOriginal: false,
              returnNewDocument: true
          }).exec()
          .then((user)=>{
            HandleResponse(res, 201, "Account Updated Successfully", user)
          })
          })
  }
  static async CreateUser(req, res) {
    const { 
      email,
      full_name,
     } = req.body;
    const NewUser = {
      email,
      full_name,
    };
    await Users.findOne({email})
      .then((user) => {
        if (user) {
          console.log(user);
          HandleResponse(res, 500, `${full_name} exists already`, user)
        }
        if (!user) {
          // console.log(users)
          Users.create(NewUser).then(() => {
            HandleResponse(res, 200, `${full_name} added to the user list successfully`, NewUser)
          });
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
