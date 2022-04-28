const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// ROUTE1 : FETCH ALL THE NOTES  http://localhost:3000/api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: "some error occured" });
    }
})

// ROUTE2 : CREATE OR ADD NOTES  http://localhost:3000/api/notes/addnote
router.post('/addnote', fetchuser, [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter valid description").isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //sreate new note
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        //save note
        const saveNote = await note.save()
        res.json(saveNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: "some erroe occured" });
    }
}
)

// ROUTE 3 :UPDATE NOTE    http://localhost:3000/api/notes/updatenote/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjI2MmIzY2VmMDA4YjExMTQ1NjA1MGVmIn0sImlhdCI6MTY1MDk4NDY2MX0.JMKsYhAEOifhuAbBtsXvKoQUArcpkDJo4VPpGjm17TM
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).send("Note  not found");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("you are note allowed to update the note ");
        }
        //for set new note we use $set
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: "some erroe occured" });
    }
})

// Router 4: DELETE

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(401).send("not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("you are note allowed to delete the note ");
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "sucess":"deleted sucessfully !", note: note })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ errors: "some erroe occured" });
    }
})
module.exports = router 