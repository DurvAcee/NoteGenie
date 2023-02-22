const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Route 1 : Get All the Notes using GET : "/api/notes/fetchallnotes". Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error Occurred!");
  }
});

// Route 2 : Add a new Note using POST : "/api/notes/addnote". Login Required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a Valid Title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters.").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return bad request and the error
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error Occurred!");
    }
  }
);

// Route 3 : Update a new Note using PUT : "/api/notes/updatenote/:id". Login Required
router.put("/updatenote/:id", fetchuser, async (req, res) => {

  try {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Find the note to be updated
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow Updation only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error Occurred!");
  }
});

// Route 4 : Delete an Exisiting Note using DELETE : "/api/notes/deletenote/:id". Login Required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be Deleted
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed!");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error Occurred!");
  }
});

module.exports = router;
