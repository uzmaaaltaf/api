// const mongoose = require("mongoose")
// var Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const User = require('../model/user-model')
const Image = require('../model/image-model')

exports.signup = async function (req,res){
    try{
     let firstname = req.body.firstname;
     let lastname = req.body.lastname;
     let gender = req.body.gender;
     let email=req.body.email;
     let password = req.body.password;
     
     
     let userEmail = await User.findOne({email: req.body.email})
    
     if(userEmail){
       return res.status(401).json({
         message: " Email Already Exist"
       })
     }
     let newUser = new User({
       firstname,
       lastname,
       gender,
       email,
       password,
   })
   await newUser.save();
   return res.status(200).json({
       message:'User Added........!!!!!!!!!!'
   })
    } catch(error){
     return res.status(404).json({
       message: "Server Error"
     })
    }
   }


// exports.signup = async function (req, res) {
//     let firstname = req.body.firstname;
//     let lastname = req.body.lastname;
//     let gender = req.body.gender;
//     let email = req.body.email;
//     let password = req.body.password;
//     let newUser = new User({
//         firstname,
//         lastname,
//         email,
//         gender,
//         password,
//     })
//     await newUser.save();
//     return res.send({
//         message: "User added Successfully.......!!!!!!!!!!"
//     })
// }

exports.login = async function (req, res) {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    });
    if (!user) {
        return res(400).json({
            message: "Please enter valid User...!!!!"
        })
    }
    else {
        const token = jwt.sign({ 
          email: req.body.email,
          _id: user._id
         }, "uzma");
        return res.send({
            message: "User Login Succesfully........!!",
            token,
            user,
        })
    }
}


exports.Image = async function(req, res){
    let image = req.file.filename;
    let newImage = new Image({
      image
    })
    await newImage.save();
    return res.status(200).json({
      message: 'Image Uploaded Successfully........!!!!!'
    })
  }

  exports.users = async function(req, res){
    let userdata = await User.findOne({email:req.user})
    // console.log("xyz",userdata);

    if(userdata){
        return res.status(200).json({
            message : "User Successfully Found.......!!!!",
            userdata,
        })
    }
    return res.status(404).json({
        message: "User Not Found.......!!!!"
    })
  }
  // exports.updateUser = async function(req, res) {
  //   const user = await User.findOne({email: req.user})
  //   // console.log("asdfghjkl", user);
  // if (user){
  //   user.firstname = req.body.firstname || user.firstname;
  //   user.lastname = req.body.lastname || user.lastname;
  //   user.gender = req.body.gender || user.gender;
  //   user.email = req.body.email || user.email;
  //   user.password = req.body.password || user.password;
  //   const updateduser = await user.save();
  //   return res.status(200).json({
  //     message: "User Updated Successfully",
  //     updateduser
  //   })
  // }
  // else{
  //   res.status(400).json({
  //     message: "User not found.....!!!!!!!!!"
  //   })
  // }
  
  //      }
       exports.updateUser = async function(req, res){
        let _id = req.id;
      const updateuser = await User.findByIdAndUpdate({_id},{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        email: req.body.email,
        password: req.body.password},  {new: true})
            return res.status(200).json({
              message: "User Updated Successfully......!!!!!!!",
              updateuser
            })
          }