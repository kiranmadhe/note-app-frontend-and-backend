const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const { find, findOne } = require('../models/User');
const bcrypt = require('bcryptjs');     //hash function  password 

router.post('/createuser', [
  //validations
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid Email').isEmail(),
  body('password', 'Password must be of at least 8 characters').isLength({ min: 8 }),

], async (req, res) => {

  //erroe handling
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ errors: "user already exists" });
    }
    //hash password generation
    const salt = await bcrypt.genSaltSync(10);
    const securedPass = await bcrypt.hash(req.body.password, salt)
    //create user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securedPass,
    })
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    //     res.json({error: 'please enter unique email',
    //     message : err.message
    //   }) //////
    // })  
    res.json(user)
  } catch (error) {
    console.log(error.mesage);
    res.status(500).json({ errors: "some error occured" });
  }
})
module.exports = router