// Needed Resources 
const express = require("express")
const router = new express.Router() 
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const regValidate = require('../utilities/account-validation')


//default route for account
router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountView))

// Route to build login view
router.get("/login", utilities.handleErrors(accountController.buildLogin));

// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Route to build registration view
router.get("/register", utilities.handleErrors(accountController.buildRegister));

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
);

router.get("/logout", utilities.handleErrors(accountController.processLogout));

router.get("/update/:account_id", 
  utilities.checkLogin, 
  utilities.handleErrors(accountController.buildUpdate)
);

router.post(
  "/update/:account_id",
  utilities.checkLogin,
  regValidate.updateRules(), 
  regValidate.checkUpdateData,
  utilities.handleErrors(accountController.accountUpdate)
);

router.post(
  "/update-password/:account_id",
  utilities.checkLogin,
  regValidate.passwordUpdateRules(), 
  regValidate.checkPasswordUpdate,
  utilities.handleErrors(accountController.passwordUpdate)
);

module.exports = router;