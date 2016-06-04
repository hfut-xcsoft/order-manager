'use strict';
const Order = require('../models').Order;
const Item = require('../models').Item;
const HttpError = require('../common/http-error');
const utils = require('../common/utils.js');

const orderController = {};

//////////////////////////////
/* @Router: /orders         */
//////////////////////////////

/**
 * @api {get} /orders 获取符合条件的订单,可排序
 * @apiName 查询订单列表
 * @apiGroup 订单
 *
 * @apiParam sort {String} 排序字段,逗号分隔,-号代表降序排列
 */
orderController.getOrders = (req, res, next) => {
  const statusArr = req.query.status && req.query.status.split(',') || [0,1,2,3,4];
  const sortObj = {};
  if (req.query.sort) {
    const sortParams = req.query.sort.split(',');
    sortParams.forEach(sortParam => {
      const field = sortParam.match(/\w+/)[0];
      const order = sortParam[0] === '-' ? -1 : 1;
      sortObj[field] = order;
    });
  }
  const opt = {sort: sortObj};
  Order.findOrdersByQuery({status: {$in: statusArr}}, opt).then(order => {
    res.success(order);
  }).catch(next);
};

/**
 * @api {post} /orders 新增订单
 * @apiName 新增订单
 * @apiGroup 订单
 *
 * @apiParam [{String}] items 商品ID数组
 */
orderController.newOrder = (req, res, next) => {
  const itemIds = req.body.items;
  if (itemIds.length === 0) {
    throw new HttpError.BadRequestError("无效订单");
  }

  const items = {};

  req.body.items.forEach(itemId => {
    items[itemId] = items[itemId] + 1 || 1;
  });

  Promise.all([
    Item.findItemsByQuery({_id: {$in: itemIds}}),
    Order.findOrdersByQuery({}, {sort: {_id: -1}, limit: 1}),
    Order.findOrdersByQuery({status: 1})
  ]).then(results => {
    let totalPrice = 0;
    results[0].forEach(item => {
      item.status = 0;
      item.count = items[item._id] || 0;
      totalPrice += item.price * item.count;
    });
    const lastOrder = results[1][0];
    const lastNumber = lastOrder ? lastOrder.number : 0;
    const productingOrderNum = results[2].length;
    const _order = new Order({
      number: lastNumber == 100 ? 1 : lastNumber + 1,
      items: results[0],
      total_price: totalPrice,
      status: productingOrderNum < 3 ? 1 : 0
    });
    return Order.createNewOrder(_order);
  }).then(order => {
      res.success(order, 201);
  }).catch(next);
};

//////////////////////////////
/* @Router: /orders/:orderId*/
//////////////////////////////

/**
 * 断言中间件
 */
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

/**
 * @api {get} /orders/:orderId 通过orderId获取订单信息
 * @apiName 获取订单信息
 * @apiGroup 订单
 *
 * @apiParam {String} orderId
 */
orderController.getOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.findOrderById(orderId).then(order => {
    res.success(order);
  }).catch(next);
};


/**
 * @api {put} /orders/:orderId 更新订单信息
 * @apiName 更新订单信息
 * @apiGroup 订单
 *
 * @apiParam {String} orderId
 * @apiParam {Number} status
 * @apiSuccess (201)
 */
orderController.updateOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  let _order;
  const _items = {};

  Order.findOrderById(orderId, true).then(order => {
    //const itemIds = req.body.items || order.items.map(item => item._id);
    let itemIds = {};
    const status = req.body.status || order.status;
    if (req.body.items) {
      itemIds = req.body.items;
      req.body.items.forEach(itemId => {
        _items[itemId] = _items[itemId] + 1 || 1;
      });
    } else {
      itemIds = order.items.map(item => {
        _items[item._id] = item.count;
        return item._id
      })
    }
    if (itemIds.length == 0) {
      throw new HttpError.BadRequestError();
    }
    if (status < order.status || status > order.status + 1) {
      throw new HttpError.ForbiddenError('状态转移错误');
    }
    order.status = status;
    _order = order;
    return Item.findItemsByQuery({_id: {$in: itemIds}})
  }).then(items => {
    let totalPrice = 0;
    if (items.length === 0) {
      throw new HttpError.BadRequestError("无效订单");
    }
    items.forEach(item => {
      item.status = 0;
      item.count = _items[item._id];
      totalPrice += item.price * item.count;
    });
    _order.items = items;
    _order.total_price = totalPrice;
    if (req.body.status == 2) {
      _order.finished_at = Date.now();
    }
    return Order.updateOrder(_order);
  }).then(order => {
    _order = order;
    return Order.updateOtherState();
  }).then(() => {
    res.success(_order, 201);
  }).catch(next);
};

/**
 * @api {delete} /orders/:orderId 通过orderId删除订单信息
 * @apiName 删除订单
 * @apiGroup 订单
 *
 * @apiParam {String} orderId
 * @apiSuccess (204)
 */
orderController.removeOrder = (req, res, next) => {
  const orderId = req.params.orderId;
  Order.removeOrderById(orderId).then(() => {
    res.success(null, 204);
  }).catch(next);
};

////////////////////////////////////////////
/* @Router: /orders/orderId/items/:itemId */
////////////////////////////////////////////

/**
 * @api {put} /orders/orderId/items/:itemId 通过orderId与itemId修改订单商品信息
 * @apiName 修改订单商品信息
 * @apiGroup 订单
 *
 * @apiParam {String} orderId
 * @apiParam {String} itemId
 *
 * @apiSuccess (201)
 */
orderController.updateItemStatus = (req, res, next) => {

  const orderId = req.params.orderId;
  const itemId = req.params.itemId;
  const status = req.body.status;
  let _order;
  if (typeof status === 'undefined') {
    throw new HttpError.BadRequestError('未传入status')
  }
  Order.findOrderById(orderId, true).then(order => {
    const items = Object.assign([], order.items);
    items.forEach(item => {
      if (item._id == itemId) {
        item.status = item.status || 0;
        if (status < item.status || status > item.status + 1) {
          throw new HttpError.ForbiddenError('状态转移错误');
        }
        item.status = status;
      }
    });
    return Order.updateOrderItems(order._id, items);
  }).then(() => {
    return Order.findOrderById(orderId, false)
  }) .then(order => {
    let isUnfinished = false;
    order.items.forEach(item => {
      if (item.status != 2) {
        isUnfinished = true
      }
    });
    if (!isUnfinished) {
      order.status = 2;
      order.finished_at = Date.now();
      return Order.updateOrder(order)
    }
    return Order;
  }).then(order => {
    _order = order;
    return Order.updateOtherState();
  }).then(() => {
    res.success(_order, 201);
  }).catch(next);
};

module.exports = orderController;
