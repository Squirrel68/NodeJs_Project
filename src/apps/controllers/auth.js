const UserModel = require("../models/user");
const getLogin = (req, res) => {
  res.render("admin/login", { data: {} });
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  let error = null;
  const users = await UserModel.find({ email, password });
  if (email == "" || password == "") {
    error = "Email va mat khau khong dc de trong";
  } else if (users.length) {
    //cap quyen
    req.session.email = email;
    req.session.password = password;
    res.redirect("/admin/dashboard");
  } else {
    error = "Tai khoan khong hop le!";
  }

  res.render("admin/login", { data: { error } });
};

const logout = (req, res) => {
  req.session.destroy();
  res.redirect("/admin/login");
};

module.exports = {
  getLogin,
  postLogin,
  logout,
};
