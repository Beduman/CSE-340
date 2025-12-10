const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
    errors: null,
  })
}

//  Build detailed inventory view

invCont.buildByInventoryId = async function (req, res, next) {
  try {
    const inventory_id = req.params.inv_id
    const vehicle = await invModel.getInventoryByInventoryId(inventory_id)
    const grid = await utilities.buildDetailView(vehicle)
    let nav = await utilities.getNav()
    const vehicleName = `${vehicle.inv_make}, ${vehicle.inv_model}`
    res.render("./inventory/inventory", {
      title: vehicleName,
      nav,
      grid,
      errors: null,
    })
  }
  catch (error) {
    console.error(error, ' Error with inventory')
    next(error);
  }
}

/* ****************************************
*  Deliver inventory view
* *************************************** */
invCont.buildInventory = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "inventory",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver registration view
* *************************************** */
invCont.buildClassification = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "classification",
    nav,
    errors: null,
  })
}

invCont.buildManagement = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", { 
    title: "Management",
    nav,
    errors: null,
  })
}



/* ****************************************
*  Process Registration
* *************************************** */
invCont.registerInventory = async function (req, res) {
  let nav = await utilities.getNav()
  const { inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id } = req.body

  const regResult = await invModel.registerInventory(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  )

  try {
    
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("inv/classification", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve registered ${inv_make} ${inv_model}. Please log in.`
    )
    res.status(201).render("inv/inventory", {
      title: "inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inv/inventory", {
      title: "inventory",
      nav,
    })
  }
}

invCont.registerClassification = async function (req, res) {
  let nav = await utilities.getNav()
  const { classification_name } = req.body

  const regResult = await invModel.registerClassification(
    classification_name
  )
  try {

  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("inv/classification", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'ve registered ${classification_name}.`
    )
    res.status(201).render("inv/inventory", {
      title: "inventory",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("inv/inventory", {
      title: "inventory",
      nav,
    })
  }
}


invCont.buildVersus = async function (req, res, next) {
  console.log('buildVersus called with params:', req.params);
  let nav = await utilities.getNav();
  const item1Id = req.params.item1;
  const item2Id = req.params.item2;
  console.log('Item IDs:', item1Id, item2Id);
  let item1 = null;
  let item2 = null;
  let item1Html = null;
  let item2Html = null;
  if (item1Id && item2Id) {
    try {
      item1 = await invModel.getInventoryByInventoryId(item1Id);
      item2 = await invModel.getInventoryByInventoryId(item2Id);
      console.log('Items fetched:', item1 ? 'item1 OK' : 'item1 NULL', item2 ? 'item2 OK' : 'item2 NULL');
      if (item1) item1Html = utilities.buildDetailView(item1);
      if (item2) item2Html = utilities.buildDetailView(item2);
    } catch (error) {
      console.error('Error in buildVersus:', error);
      req.flash("notice", "Error loading comparison vehicles.");
      return res.redirect("/inventory");
    }
  }
  res.render("inventory/versus", {
    title: "Compare Vehicles",
    nav,
    item1Html,
    item2Html,
    errors: null,
  });
}

//error view

invCont.buildError = async function (req, res, next) {
  try {
    let nav = await utilities.getNav()
    res.render("./error/error", {
      title: "Management",
      nav,
      errors: null,
    })
  }
  catch (error) {
    console.error(error, ' Error')
    next(error);
  }
}

module.exports = invCont