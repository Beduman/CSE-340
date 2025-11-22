// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//route to build inventory detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

module.exports = router;