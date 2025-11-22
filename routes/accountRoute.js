// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process the login attempt
router.post(
  "/login",
  (req, res) => {
    res.status(200).send('login process')
  }
)

module.exports = router;