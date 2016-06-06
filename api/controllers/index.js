const router = require('express').Router();
const itemController = require('./item');
const orderController = require('./order');
const statisticController = require('./statistic');

router.route('/items')
  .get(itemController.getItems)
  .post(itemController.newItem);

router.route('/items/:itemId')
  .all(itemController.assertExist)
  .get(itemController.getItem)
  .put(itemController.updateItem)
  .delete(itemController.removeItem);


router.route('/orders')
  .get(orderController.getOrders)
  .post(orderController.newOrder);

router.route('/orders/:orderId')
  .all(orderController.assertOrderExist)
  .get(orderController.getOrder)
  .put(orderController.updateOrder)
  .delete(orderController.removeOrder);

router.route('/orders/:orderId/items/:itemId')
  .all(orderController.assertOrderExist, itemController.assertExist)
  .put(orderController.updateItemStatus);

router.route('/statistics')
  .get(statisticController.getStatisticData);

module.exports = router;
