const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'DurvAcee';


// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/', [
    body('name','Enter a Valid Name').isLength({min: 3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5}),

], async (req, res)=>{

    // Using express-validator to validate req.body responses & fetch its errors in errors object
   const errors = validationResult(req);
   if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
   }

//    const user = User(req.body);
//    user.save()
//    res.send(req.body);


// Handling DB Errors like duplicate value errors
// Check whether the user with this email already exists
try {
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exists."})
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
    })
    
    // .then(user => res.json(user))
    // .catch(err => {console.log(err)
    //     res.json({error: 'Please Enter a Unique value for Email', message: err.message})
    // });
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json(authToken);

} catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occurred!");
    }

})

module.exports = router