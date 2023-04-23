const CategoryModel = require("../models/category");
const ProductModel = require("../models/product");
// func test 1
const test = async (req, res) => {
  const categories = await CategoryModel.find();
  const products = await ProductModel.find();
  console.log(categories.length + products.length);
  // ProductModel.find()
  //   .populate({ path: "cat_id" })
  //   .exec((err, docs) => {
  //     console.log(docs);
  //   });
  // const data2 = "NodeJs";
  // res.redirect("/admin/dashboard");

  //   res.send(`
  //     <form method=post>
  //         <input type = text name = email />
  //         <br/>
  //         <input type= text name =  password />
  //         <br/>
  //         <input type= submit name = submit value = Sent />
  //     </form>
  //   `);
};
const test2 = (req, res) => {
  res.send(req.body.email);
};
module.exports = {
  test,
  test2,
};
