var DataTypes = require("sequelize").DataTypes;
var _dictionaries = require("./dictionaries");
var _dictionaries_item = require("./dictionaries_item");

function initModels(sequelize) {
  var dictionaries = _dictionaries(sequelize, DataTypes);
  var dictionaries_item = _dictionaries_item(sequelize, DataTypes);


  return {
    dictionaries,
    dictionaries_item,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
