const express = require("express");
const adminRouter = express.Router();
const connection = require("../index")

//home
adminRouter.get("/",(req, res)=>{
    res.render("home")
})

// adminRouter.get("/applicants", (req, res) => {
//     res.render("./admin/user")
// })

adminRouter.get("/applicants", (req, res) => {
    const sql = "SELECT * FROM applicant";
  
    connection.query(sql, (err, results) => {
      if (err) {
        console.error("Error retrieving data from MySQL:", err);
        // Handle the error appropriately
        return res.status(400).json({ status: "failed", message: "Error retrieving data" });
      }
      // Data retrieved successfully
      //res.status(200).json({ status: "success", data: results });
      res.render("./admin/user", {results})
    });
});

  adminRouter.get("/company", (req, res) => {
    const sql = "SELECT * FROM company";
  
    connection.query(sql, (err, rows) => {
      if (err) {
        console.error("Error retrieving data from MySQL:", err);
        // Handle the error appropriately
        return res.status(400).json({ status: "failed", message: "Error retrieving data" });
      }
      // Data retrieved successfully
      //res.status(200).json({ status: "success", data: results });
      res.render("./admin/company", {rows})
    });
  });
  

module.exports = adminRouter;