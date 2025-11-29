// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//route to build inventory detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));

//route to add management view
router.get("/management", utilities.handleErrors(invController.buildError));
//route to add classification
router.get("/add-classification", utilities.handleErrors(invController.buildClassification));
//route to add inventory
router.get("/add-inventory", utilities.handleErrors(invController.buildInventory));


//process add classification
router.post("/add-classification",
  utilities.handleErrors(invController.registerClassification)
);

//process add inventory
router.post("/add-inventory",
  utilities.handleErrors(invController.registerInventory)
);


module.exports = router;