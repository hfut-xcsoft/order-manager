const Order = require('../models').Order;
const Item = require('../models').Item;
const HttpError = require('../common/http-error');
const utils = require('../common/utils.js');

const orderController = {};

orderController.getOrders = (req, res, next) => {
    const opt = {};
    Order.findOrdersByQuery({}, opt).then(order => {
      res.success(order);
    }).catch(next);
};

orderController.newOrder = (req, res, next) => {
  const items = res.body.items;
  var itemPromises = items.map(itemId => {
      return Item.findItemById(itemId);
  });

  Promise.all(itemPromises).then( __items => {
    const _order = new Order({
      items: __items;
    });
    return Order.createNewOrder(_order);

  }).then(order => {
      res.success(order, 201);
  }).catch(next);

};

orderController.getOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findOrderById(orderId).then(order => {
    res.success(order);
  }).catch(next);
};

orderController.assertOrderExist = (req, res, next) => {
  const orderId = req.params.orderId;
  if(!utils.isObjectId(orderId)) {
    throw new HttpError.BadRequestError('The order is wrong');
  }
  Order.findOrderById(orderId).then(order => {
    if(!order) {
      throw new HttpError.NotFoundError('The order is not exist');
    }
    next();
  }).catch(next);
};

orderController.assertItemExist = (req, res, next) => {
  const itemId = req.params.itemId;
  if(!utils.isObjectId(itemId)) {
    throw new HttpError.BadRequestError('The order is wrong');
  }
  Order.findOrderById(itemId).then(item => {
    if(!item) {
      throw new HttpError.NotFoundError('The item is not exist');
    }
    next();
  }).catch(next);
}


orderController.updateOrder = (req, res, next) => {
  const items = req.body.items;
  if(!items || items.length == 0) {
    throw new HttpError.BadRequestError();
  }
  const orderId = req.params.orderId;
  const _status = req.params.status;

  var itemPromises = items.map(itemId => {
      return Item.findItemById(itemId);
  });

  Promise.all(itemPromises).then( __items => {
    const _order = new Order({
      items: __items;
    });
    _order.status: _status;

    return Order.updateOderById(orderId, _order);

  }).then(order => {
      res.success(order, 201);
  }).catch(next);

};

orderController.removeOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.removeOrderById(orderId).then(() => {
    res.success({}, 204);
  }).catch(next);
};

orderController.updateItemStatus = (req, res, next) => {
  const orderId = req.params.orderId;
  const itemId = req.params.itemId;
  const status = req.params.status;
  Order.updateItemStatusById(orderId, itemId, status).then(order => {
    res.success(order, 201);
  }).catch(next);
};

module.exports = orderController;
