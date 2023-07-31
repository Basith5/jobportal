const express = require("express");
const personRouter = express.Router();
const connection = require("../index")

personRouter.get("/signup",(req, res) =>{
    res.render("./person/p_signup")
})

personRouter.get("/registration",(req, res) => {
  res.render("./person/p_registration") //chane remove p_
})

personRouter.post("/signup", (req, res) => {
    const { name, email, mobile, password } = req.body;

    // Validate input data
    if (!name || !email || !mobile || !password) {
        return res.status(400).json({ status: "failed", message: "Please provide all required fields" });
      }
  
    const sql = "INSERT INTO persons (name, email, mobile, password) VALUES (?, ?, ?, ?)";
    const values = [name, email, mobile, password];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error storing data in MySQL:", err);
        // Handle the error appropriately
        return res.status(400).json({ status: "failed", message: "Error to connect" });
      }
      // Data stored successfully
      res.render("./person/p_registration");
    });
});

personRouter.post("/register", (req, res) => {
  const { name, dob, email, skills, experience, github, username, gender, mobile, job, social } = req.body;

  // Validate input data
  if (!name || !dob || !email || !skills || !experience || !github || !username || !gender || !mobile || !job || !social) {
      return res.status(400).json({ status: "failed", message: "Please provide all required fields" });
    }

  const sql = "INSERT INTO applicant (name, dob, email, skills, experience, github, username, gender, mobile, job, social) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [name, dob, email, skills, experience, github, username, gender, mobile, job, social];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error storing data in MySQL:", err);
      // Handle the error appropriately
      return res.status(400).json({ status: "failed", message: "Error to connect" });
    }
    // Data stored successfully
    res.render("./home");
  });
});
  

module.exports = personRouter;
