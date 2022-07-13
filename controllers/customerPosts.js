const CustomerPost = require("../models/CustomerPost");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

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
  const customerPost = await CustomerPost.create(req.body);
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
  getAllCustomerPostsByUserId,
  getAllCustomerPostsByStoreId,
  getCustomerPostByUserId,
  getCustomerPost,
  createCustomerPost,
  updateCustomerPost,
  deleteCustomerPost,
};
