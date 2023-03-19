const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'DurvAcee';


// Route 1 : Create a User using: POST "/api/auth/". Doesn't require Auth
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

// Route 2 : Authenticate a user using POST: "/api/auth/login". No Login Required
router.post('/login', [
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password cannot be blank').exists(),
], async (req, res)=>{

    let success = false;
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
         return res.status(400).json({errors: errors.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})


// Route 3 : Get Logged in User Details using POST: "/api/auth/getuser". Login Required

router.post('/getuser', fetchuser, async(req, res) => {

    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }
})

module.exports = router