const Store = require("../models/Store");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getAllStores = async (req, res) => {
  const stores = await Store.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ stores, count: stores.length });
};
const getStore = async (req, res) => {
  const {
    user: { userId },
    params: { id: storeId },
  } = req;

  const store = await Store.findOne({
    _id: storeId,
    createdBy: userId,
  });

  if (!store) {
    throw new NotFoundError(`No store with id ${storeId}`);
  }
  res.status(StatusCodes.OK).json({ store });
};

const createStore = async (req, res) => {
  req.body.createdBy = req.user.userId;
  req.body.owner = req.user.userId;

  const store = await Store.create(req.body);
  res.status(StatusCodes.CREATED).json({ store });
};

const updateStore = async (req, res) => {
  const {
    body: { name, owner, city, district, phone },
    user: { userId },
    params: { id: storeId },
  } = req;

  if (owner) {
    throw new BadRequestError(
      "Store onwer field cannot be updated without permission"
    );
  }

  if (name === "" || city === "" || district === "" || phone === "") {
    throw new BadRequestError("Store fields cannot be empty");
  }

  const store = await Store.findByIdAndUpdate(
    { _id: storeId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!store) {
    throw new NotFoundError(`No store with id ${storeId}`);
  }
  res.status(StatusCodes.OK).json({ store });
};

const deleteStore = async (req, res) => {
  const {
    user: { userId },
    params: { id: storeId },
  } = req;

  const store = await Store.findByIdAndRemove({
    _id: storeId,
    createdBy: userId,
  });
  if (!store) {
    throw new NotFoundError(`No store with id ${storeId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllStores,
  createStore,
  deleteStore,
  updateStore,
  getStore,
};
