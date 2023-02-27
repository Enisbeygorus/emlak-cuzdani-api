const CustomerPost = require("../models/CustomerPost");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllCustomerPosts = async (req, res) => {
console.log("req.query:", req.query )
  const { city, district, roomNumber, maxPrice, minPrice } = req.query

  const queryObject = {}

  if (city) {
    queryObject.city = city
  }

  if (district) {
    queryObject.district = district
  }

  if (roomNumber) {
    queryObject.roomNumber = roomNumber
  }

  if (maxPrice) {
    queryObject.maxPrice = { $lte: maxPrice }
  }

  if (minPrice) {
    queryObject.minPrice = { $gte: minPrice }
  }

  if(Object.keys(queryObject).length === 0) {
    res.status(StatusCodes.OK).json({ customerPosts: [], count: 0});
    return;
  }

  let result = CustomerPost.find(queryObject)

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  // const customerPosts = await CustomerPost.find(queryObject)

  const customerPosts = await result
  res.status(StatusCodes.OK).json({ customerPosts, count: customerPosts.length });

}

const getAllCustomerPostsByUserId = async (req, res) => {
  const customerPost = await CustomerPost.find({
    createdBy: req.user.userId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ customerPost, count: customerPost.length });
};

const getAllCustomerPostsByStoreId = async (req, res) => {
  const {
    params: { storeId: storeId },
  } = req;

  const customerPost = await CustomerPost.find({
    store: storeId,
  }).sort("createdAt");
  res.status(StatusCodes.OK).json({ customerPost, count: customerPost.length });
};

const getCustomerPostByUserId = async (req, res) => {
  const {
    user: { userId },
    params: { id: customerPostId },
  } = req;

  const post = await CustomerPost.findOne({
    _id: customerPostId,
    createdBy: userId,
  });

  if (!post) {
    throw new NotFoundError(`No post with id ${customerPostId}`);
  }
  res.status(StatusCodes.OK).json({ post });
};

const getCustomerPost = async (req, res) => {
  const {
    params: { id: customerPostId },
  } = req;

  const post = await CustomerPost.findOne({
    _id: customerPostId,
  });

  if (!post) {
    throw new NotFoundError(`No post with id ${customerPostId}`);
  }
  res.status(StatusCodes.OK).json({ post });
};

const createCustomerPost = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const reqBody = { ...req.body };
  reqBody.maxPrice = +reqBody.maxPrice
  reqBody.minPrice = +reqBody.minPrice

  console.log("reqBody:", reqBody)

  const customerPost = await CustomerPost.create(reqBody);
  res.status(StatusCodes.CREATED).json({ customerPost });
};

const updateCustomerPost = async (req, res) => {
  const {
    body: { description, maxPrice, minPrice, city, district, store },
    user: { userId },
    params: { id: customerPostId },
  } = req;

  if (
    description === "" ||
    city === "" ||
    district === "" ||
    store === "" ||
    maxPrice === undefined ||
    minPrice === undefined
  ) {
    throw new BadRequestError("CustomerPost fields cannot be empty");
  }

  const customerPost = await CustomerPost.findByIdAndUpdate(
    { _id: customerPostId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!customerPost) {
    throw new NotFoundError(`No post with id ${customerPostId}`);
  }

  res.status(StatusCodes.OK).json({ customerPost });
};

const deleteCustomerPost = async (req, res) => {
  const {
    user: { userId },
    params: { id: customerPostId },
  } = req;

  const post = await CustomerPost.findByIdAndRemove({
    _id: customerPostId,
    createdBy: userId,
  });
  if (!post) {
    throw new NotFoundError(`No post with id ${customerPostId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllCustomerPosts,
  getAllCustomerPostsByUserId,
  getAllCustomerPostsByStoreId,
  getCustomerPostByUserId,
  getCustomerPost,
  createCustomerPost,
  updateCustomerPost,
  deleteCustomerPost,
};
