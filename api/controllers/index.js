const router = require('express').Router();
const itemController = require('./item');

router.route('/items')
  .get(itemController.getItems)
  .post(itemController.newItem);

router.route('/items/:itemId')
  .get(itemController.getItem)
  .put(itemController.updateItem)
  .delete(itemController.removeItem);

router.all(() => {
  throw new HttpError.NotFoundError();
});


module.exports = router;
