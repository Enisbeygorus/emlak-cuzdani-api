const express = require("express");

const router = express.Router();
const {
  createStore,
  deleteStore,
  getAllStores,
  getStore,
  updateStore,
} = require("../controllers/stores");

router.route("/").post(createStore).get(getAllStores);

router.route("/:id").get(getStore).delete(deleteStore).patch(updateStore);

module.exports = router;
