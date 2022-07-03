const express = require("express");

const router = express.Router();
const {
  createCustomerPost,
  deleteCustomerPost,
  getCustomerPost,
  getAllCustomerPostsByStoreId,
  getAllCustomerPostsByUserId,
  getCustomerPostByUserId,
  updateCustomerPost,
} = require("../controllers/customerPosts");

router.route("/").post(createCustomerPost).get(getCustomerPostByUserId);

router.route("/allByUserId").get(getAllCustomerPostsByUserId);
router.route("/allByStoreId/:storeId").get(getAllCustomerPostsByStoreId);

router
  .route("/:id")
  .get(getCustomerPost)
  .delete(deleteCustomerPost)
  .patch(updateCustomerPost);

module.exports = router;
