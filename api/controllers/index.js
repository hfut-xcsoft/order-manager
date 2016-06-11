const router = require('express').Router();
const itemController = require('./item');
const orderController = require('./order');
const statisticController = require('./statistic');
const HttpError = require('some-http-error');

router.route('/items')
  .get(itemController.getItems)
  .post(itemController.newItem)
  .all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/items/:itemId')
  .all(itemController.assertExist)
  .get(itemController.getItem)
  .put(itemController.updateItem)
  .delete(itemController.removeItem)
  .all(() => {throw new HttpError.MethodNotAllowedError()});


router.route('/orders')
  .get(orderController.getOrders)
  .post(orderController.newOrder)
  .all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/orders/:orderId')
  .all(orderController.assertOrderExist)
  .get(orderController.getOrder)
  .put(orderController.updateOrder)
  .delete(orderController.removeOrder)
  .all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/orders/:orderId/items/:itemId')
  .all(orderController.assertOrderExist, itemController.assertExist)
  .put(orderController.updateItemStatus)
  .all(() => {throw new HttpError.MethodNotAllowedError()});

router.route('/statistics')
  .get(statisticController.getStatisticData)
  .all(() => {throw new HttpError.MethodNotAllowedError()});

module.exports = router;
