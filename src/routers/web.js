const express = require("express");
const req = require("express/lib/request");
const router = express.Router();

// Import Controller
const TestController = require("../apps/controllers/test");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");
const UserController = require("../apps/controllers/user");

const SiteController = require("../apps/controllers/site");

// Import Middleware
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");

// router.get("/", (req, res) => {
//   res.send("<h1>Overview</h1>");
// });
router.get("/test", TestController.test);
router.get("/test1", TestController.test1);
router.get("/test2", TestController.test2);

//Router admin
router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post(
  "/admin/login",
  AuthMiddleware.checkLogin,
  AuthController.postLogin
);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);
router.get(
  "/admin/dashboard",
  AuthMiddleware.checkAdmin,
  AdminController.index
);

//Router Product
router.get(
  "/admin/products",
  AuthMiddleware.checkAdmin,
  ProductController.index
);
router.get(
  "/admin/products/create",
  AuthMiddleware.checkAdmin,
  ProductController.create
);
router.post(
  "/admin/products/store",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.store
);

router.get(
  "/admin/products/edit/:id",
  AuthMiddleware.checkAdmin,
  ProductController.edit
);
router.post(
  "/admin/products/update/:id",
  AuthMiddleware.checkAdmin,
  UploadMiddleware.single("thumbnail"),
  ProductController.update
);
router.get(
  "/admin/products/delete/:id",
  AuthMiddleware.checkAdmin,
  ProductController.del
);

//Router User & Category
router.get("/admin/users", AuthMiddleware.checkAdmin, UserController.index);
router.get(
  "/admin/users/create",
  AuthMiddleware.checkAdmin,
  UserController.create
);
router.get(
  "/admin/users/edit/:id",
  AuthMiddleware.checkAdmin,
  UserController.edit
);
router.get(
  "/admin/users/delete/:id",
  AuthMiddleware.checkAdmin,
  UserController.del
);

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

// Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);
router.get("/search", SiteController.search);

router.post("/add-to-cart", SiteController.addToCart);
router.get("/cart", SiteController.cart);
router.post("/update-cart", SiteController.updateCart);
router.get("/del-cart-:id", SiteController.delCart);
router.post("/order", SiteController.order);
router.get("/success", SiteController.success);

module.exports = router;
