const moment = require("moment");
const ejs = require("ejs");
const path = require("path");
const transporter = require("../../common/transporter");
const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
const home = async (req, res) => {
  const featuredProduct = await ProductModel.find({
    featured: true,
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(6);
  const latestProduct = await ProductModel.find({ is_stock: true })
    .sort({ _id: -1 })
    .limit(6);
  // console.log(featured);
  res.render("site/index", { featuredProduct, latestProduct });
};
const category = async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  const title = category.title;
  // console.log(title);
  const products = await ProductModel.find({ cat_id: id }).sort({ _id: -1 });
  const total = products.length;
  res.render("site/category", { products, title, total });
};
const product = async (req, res) => {
  const { id } = req.params;
  const product = await ProductModel.findById(id);
  const comments = await CommentModel.find({ prd_id: id }).sort({ _id: -1 });
  // console.log(comments);
  res.render("site/product", { product, comments, moment });
};
const comment = async (req, res) => {
  const { id } = req.params;
  const { email, full_name, body } = req.body;
  const comment = {
    email,
    full_name,
    prd_id: id,
    body,
  };
  await new CommentModel(comment).save();
  res.redirect(req.path);
};
const search = async (req, res) => {
  const keyword = req.query.keyword || "";
  const filter = {};
  if (keyword) {
    filter.$text = {
      $search: keyword,
    };
  }
  const products = await ProductModel.find(filter);
  // console.log(products);
  res.render("site/search", { keyword, products });
};
const addToCart = async (req, res) => {
  const { id, qty } = req.body;
  let cart = req.session.cart;
  let isProductExists = false;
  cart.map((item) => {
    if (item.id === id) {
      item.qty += parseInt(qty);
      isProductExists = true;
    }
    return item;
  });
  if (!isProductExists) {
    const product = await ProductModel.findById(id);
    cart.push({
      id,
      name: product.name,
      price: product.price,
      img: product.thumbnail,
      qty: parseInt(qty),
    });
  }
  req.session.cart = cart;
  res.redirect("/cart");
};

const cart = (req, res) => {
  const cart = req.session.cart;
  res.render("site/cart", { cart });
};
const updateCart = (req, res) => {
  const { products } = req.body;
  // console.log(products);

  let cart = req.session.cart;
  cart.map((item) => {
    return (item.qty = parseInt(products[item.id].qty));
  });
  req.session.cart = cart;
  res.redirect("/cart");
};
const delCart = (req, res) => {
  const { id } = req.params;
  // console.log(id);
  let cart = req.session.cart;
  const newCart = cart.filter((item) => {
    return item.id != id;
  });
  req.session.cart = newCart;
  res.redirect("/cart");
};
const order = async (req, res) => {
  const { mail, name, phone, add } = req.body;
  const items = req.session.cart;
  // console.log(body);

  // console.log(items);

  const html = await ejs.renderFile(
    path.join(req.app.get("views"), "site/order-mail.ejs"),
    {
      name,
      phone,
      mail,
      add,
      items,
    }
  );
  await transporter.sendMail({
    to: mail,
    from: "VietPro Shop",
    subject: "Xac nhan don hang tu VietPro shop",
    html,
  });
  req.session.cart = [];
  res.redirect("/success");
};

const success = (req, res) => {
  res.render("site/success");
};

module.exports = {
  home,
  category,
  product,
  comment,
  search,
  addToCart,
  cart,
  updateCart,
  delCart,
  order,
  success,
};
