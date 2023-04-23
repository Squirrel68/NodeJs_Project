const index = (req, res) => {
  res.send("products");
};
const create = (req, res) => {
  res.send("create");
};
const edit = (req, res) => {
  res.send("edit");
};
const del = (req, res) => {
  res.send("del");
};
module.exports = {
  index,
  create,
  edit,
  del,
};
