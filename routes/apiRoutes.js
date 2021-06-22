const express = require("express");
const router = express.Router();
const db = require("../models");
const student = require("../models/student");
const QRCode = require('qrcode')

// get all students
router.get("/all", (req, res) => {
  db.Student.findAll().then(student => res.send(student));
});

// get single student by id
router.get("/find/:class", (req, res) => {
  db.Student.findAll({
    where: {
      class: req.params.class
    }
  }).then(student => res.send(student));
});

// post new student
router.post("/new", (req, res) => {
  db.Student.create({
    name: req.body.name,
    email: req.body.email,
    age:req.body.age,
    parents:req.body.parents,
    class: req.body.class

  }).then(submitedStudent => res.send(submitedStudent));
});

// delete student
router.delete("/delete/:id", (req, res) => {
  db.Student.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a student
router.put("/edit", (req, res) => {
  db.Student.update(
    {
      name: req.body.name,
      email: req.body.email,
      age:req.body.age,
      parents:req.body.parents,
      class: req.body.class
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});
 

router.post("/createBadge", (req, res) => {
  //qrcode generator

 let data={
  name: req.body.name,
  
  class: req.body.class

}

 let stringdata = JSON.stringify(data)
 
//  // Print the QR code to terminal
 QRCode.toString(stringdata,{type:'terminal'},
                     function (err, QRcode) {
  
     if(err) return console.log("error occurred")
  
     // Printing the generated code
     console.log(QRcode)
 })
    
 // Converting the data into base64
 QRCode.toDataURL(stringdata, function (err, code) {
     if(err) return console.log("error occurred")
  
     // Printing the code
     console.log(code)
 })
  db.Student.createBadge({
  //   name: req.body.name,
  
  //  class: req.body.class

  }).then(QRcode => res.send(QRcode));
});
 module.exports = router;
