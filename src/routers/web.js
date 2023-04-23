const express = require("express");
const req = require("express/lib/request");
const router = express.Router();
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const UserController = require("../apps/controllers/user");

router.get("/", (req, res) => {
  res.send("<h1>Overview</h1>");
});
router.get("/test", TestController.test);
router.post("/test1", TestController.test2);
//Router admin
router.get("/admin/login", AuthController.getLogin);
router.post("/admin/login", AuthController.postLogin);

router.get("/admin/logout", AuthController.logout);
router.get("/admin/dashboard", AdminController.index);

router.get("/admin/products", ProductController.index);
router.get("/admin/products/create", ProductController.create);
router.get("/admin/products/edit/:id", ProductController.edit);
router.get("/admin/products/delete/:id", ProductController.del);

//Router User & Category
router.get("/admin/users", UserController.index);
router.get("/admin/users/create", UserController.create);
router.get("/admin/users/edit/:id", UserController.edit);
router.get("/admin/users/delete/:id", UserController.del);

router.get("/admin/categories", (req, res) => {
  res.send("/admin/categories");
});
router.get("/admin/categories/create", (req, res) => {
  res.send("/admin/categories/create");
});
router.get("/admin/categories/edit/:id", (req, res) => {
  res.send("/admin/categories/edit/:id");
});
router.get("/admin/categories/delete/:id", (req, res) => {
  res.send("/admin/categories/delete/:id");
});
module.exports = router;
