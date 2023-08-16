const checkLogin = (req, res, next) => {
  //login thanh cong -> duoi ve dashboard
  if (req.session.email && req.session.password) {
    return res.redirect("/admin/dashboard");
  }
  next();
};
const checkAdmin = (req, res, next) => {
  //chua login -> duoi ve login
  if (!req.session.email || !req.session.password) {
    return res.redirect("/admin/login");
  }
  next();
};
module.exports = {
  checkLogin,
  checkAdmin,
};
