const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// Route 1 : Get All the Notes using GET : "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchuser, async (req, res)=>{

    try {   
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occurred!");
    }

})

// Route 2 : Add a new Note using POST : "/api/notes/addnote". Login Required
router.post('/addnote', fetchuser, [  
    body('title','Enter a Valid Title').isLength({min: 3}),
    body('description','Description must be at least 5 characters.').isLength({min: 5}),
   
], async (req, res)=>{

    try {

        const {title, description, tag } = req.body;

        // If there are errors, return bad request and the error
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
             return res.status(400).json({errors: errors.array() });
        }
    
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
    
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error Occurred!");
    }

   
})

module.exports = router