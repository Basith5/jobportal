const express = require("express");
const companyRouter = express.Router();
const connection = require("../index")

companyRouter.get("/login",(req, res)=>{
    res.render("./company/c_login")
})

companyRouter.post("/signup", (req, res) => {
    const { companyName, ownerName, email, mobile, location, category, companyDesc, password } = req.body;
  
    // Validate input data
    if (!companyName || !ownerName || !email || !mobile || !location || !category || !companyDesc || !password) {
      return res.status(400).json({ status: "failed", message: "Please provide all required fields" });
    }
  
    const sql = "INSERT INTO company (companyName, ownerName, email, mobile, location, category, companyDesc, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [companyName, ownerName, email, mobile, location, category, companyDesc, password];
  
    connection.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error storing data in MySQL:", err);
        // Handle the error appropriately
        return res.status(500).json({ status: "failed", message: "Error storing data in the database" });
      }
  
      // Data stored successfully
      res.render("./company/c_login", { message: "Successfully company created" });
    });
});

// companyRouter.get("/application",(req, res) => {
//   res.render("./company/application")
// })

companyRouter.get("/application", (req, res) => {
  const sql = "SELECT * FROM applicant";

  connection.query(sql, (err, rows) => {
    if (err) {
      console.error("Error retrieving data from MySQL:", err);
      return res.status(400).json({ status: "failed", message: "Error retrieving data" });
    }
    res.render("company/application", { rows });
  });
});


companyRouter.get("/signup",(req, res) => {
    res.render("./company/c_signup")
})

module.exports = companyRouter;