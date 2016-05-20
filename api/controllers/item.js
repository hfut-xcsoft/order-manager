const itemController = {};

/*
 * @Router: /items
 */
itemController.getItems = (req, res, next) => {
  res.json({items: [1,2,3]});
};

itemController.newItem = (req, res, next) => {
  //
};



/*
 * @Router: /items/:itemId
 */
itemController.getItem = (req, res, next) => {
  //
};

itemController.updateItem = (req, res, next) => {
  //
};

itemController.removeItem = (req, res, next) => {
  //
};
module.exports = itemController;