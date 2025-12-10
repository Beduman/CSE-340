// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const invController = require("../controllers/invController")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));

//route to build inventory detail view
router.get("/detail/:inv_id", utilities.handleErrors(invController.buildByInventoryId));


//route to add classification
router.get("/add-classification", 
  utilities.checkLogin, 
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildClassification));
//route to add inventory
router.get("/add-inventory", 
  utilities.checkLogin,
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildInventory));
//route to inventory management view
router.get("/", 
  utilities.checkLogin,
  utilities.checkEmployee,
  utilities.handleErrors(invController.buildManagement));

//process add classification
router.post("/add-classification",
  utilities.checkLogin,
  utilities.checkEmployee,
  utilities.handleErrors(invController.registerClassification)
);

//process add inventory
router.post("/add-inventory",
  utilities.checkLogin,
  utilities.checkEmployee,
  utilities.handleErrors(invController.registerInventory)
);


module.exports = router;