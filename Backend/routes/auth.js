const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', [
    body('name','Enter a Valid Name').isLength({min: 3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5}),

], (req, res)=>{

   const errors = validationResult(req);
   if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
   }

//    const user = User(req.body);
//    user.save()
//    res.send(req.body);

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
        res.json({error: 'Please Enter a Unique value for Email', message: err.message})
    });


})

module.exports = router