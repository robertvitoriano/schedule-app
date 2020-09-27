const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  async create(req, res) {
      try {
        const encrypted = await bcrypt.hash(req.body.password,4);
        const user = await User.create({
            email:req.body.email,
            password:encrypted,
            name:req.body.name
        });
        const token = jwt.sign({ _id: user._id }, 'mysecret');
        await user.save();

       return res.status(201).send({
        token,
        user,
      });
      } catch (e) {
        res.send(e);
        console.log(e);
      }
  },

  async index(req, res) {
      try {
        const user = await User.findById(req.params.userId);    
        const token = jwt.sign({ _id: user._id }, 'mysecret');
   
        res.send({
          token,
          user,
        });
       
      } catch (e) {
        res.send(e);
        console.log(e);
      }
  },



  async login(req,res){
    try {
     const user = await User.findOne({email:req.body.email});
      const isMatch = await bcrypt.compare(req.body.password, user.password);
     if(isMatch){
      const token = jwt.sign({ _id: user._id }, 'mysecret');
      res.send({
        token,
        user,
      });
     }
    }catch(e){
        console.log(e);
    }
},

  async logout(req, res) {
    console.log(req.body.email)
      try {
          req.token ='';
        const user = await User.findOne({email:req.body.email});
       return res.status(200).send(user);
      } catch (e) {
        res.send(e);
        console.log(e);
      }
  },

 
};
