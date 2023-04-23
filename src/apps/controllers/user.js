const index = (req, res) => {
  res.send("admin-users");
};
const create = (req, res) => {
  res.send("admin-create");
};
const edit = (req, res) => {
  res.send("admin-edit");
};
const del = (req, res) => {
  res.send("admin-del");
};
module.exports = {
  index,
  create,
  edit,
  del,
};
