var DataTypes = require("sequelize").DataTypes;
var _login_records = require("../app/model/login_records");

function initModels(sequelize) {
  var login_records = _login_records(sequelize, DataTypes);


  return {
    login_records,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
