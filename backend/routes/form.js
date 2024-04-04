const express = require('express');
const router = express.Router();
const Form = require("../models/Form");
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");



//ROUTE 1:- Get All the notes using : GET "/api/notes/fetchallforms" || Login required
router.get("/fetchAll", fetchuser, async (req, res) => {
  try {
    // console.log(req.user.id);
    const data = await Form.find({ user: req.user.id });
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});




// ROUTE 2: Add a new form using POST "/api/forms/addform" (Login required)
router.post(
  "/addform",
  fetchuser, // Fetch user middleware
  [
    body("project_name", "Enter a Project Name").isLength({ min: 3 }),
    body("project_des", "Description should contain at least 5 characters").isLength({ min: 5 }),
    body("roles").notEmpty(),
    body("url").isURL(),
    body("phase").notEmpty(),
    body("status").notEmpty()
  ],
  async (req, res) => {
    try {
      const { project_name, project_des, roles, url, phase, status } = req.body;

      // Check if there are errors in validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const form = new Form({ project_name, project_des, roles, url, phase, status, user: req.user.id  });
      const savedForm = await form.save();
      res.json(savedForm);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3:- Update an existing  note using : PUT "/api/notes/updatenote" || Login required
router.put("/updateform/:id", fetchuser, async (req, res) => {
  try {
    const { project_name, project_des, roles, url, phase, status  } = req.body;
    //Create a newNote object

    const newForm = {};

    if (project_name) {
      newForm.project_name = project_name;
    }
    if (project_des) {
      newForm.project_des = project_des;
    }
    if (roles) {
      newForm.roles = roles;
    }
    if(url){
      newForm.url=url;
    }
    if(phase){
      newForm.phase=phase;
    }
    if(status){
      newForm.status=status;
    }

    // Find the note to be updated and update
    let note = await Form.findByIdAndUpdate(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: newForm },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


//ROUTE 4:- Delete an existing  note using : DELETE "/api/notes/deletenote" || Login required
router.delete("/deleteform/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be deleted
    let note = await Form.findByIdAndUpdate(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    //Allow deletion if user are authenticated
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Form.findByIdAndDelete(req.params.id);
    res.json({ Success: "Form has been deleted Successfully!", note: note });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTE 5:- Search an existing form using : GET "/api/notes/search" || Login required
router.get("/SearchQuery", fetchuser, async (req, res) => {
  // console.log(req.query);
  try {
    // console.log(req.user.id);
    const data = await Form.find({ user: req.user.id });
    // console.log(data);
    const search=data.filter((e)=>e.project_name.toLocaleLowerCase().includes(req.query.q));
    res.json(search);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;