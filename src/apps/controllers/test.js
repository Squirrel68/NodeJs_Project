const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
// func test 1
const test = (req, res) => {
  req.session.email = "vietpro@gmail.com";
  res.send("session defined!");
};
const test1 = (req, res) => {
  if (req.session.email) {
    res.send("defined");
  } else {
    res.send("not define");
  }
};
const test2 = (req, res) => {
  req.session.destroy();
};
module.exports = {
  test,
  test1,
  test2,
};
