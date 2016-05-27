const Item = require('../models').Item;
const HttpError = require('../common/http-error');
const utils = require('../common/utils');

const itemController = {};

itemController.errorHandling = (req, res, next) => {
  const itemId = req.params.itemId;
  if(!utils.isObjectId(itemId)) {
    throw new HttpError.NotFoundError("The item is not exist");
  }
  next();
};
/**
 * @api {get} /items 获取符合条件的商品,可排序
 * @apiName 查询商品列表
 * @apiGroup 商品
 *
 * @apiParam sort {String} 排序字段,逗号分隔,-号代表降序排列
 */
itemController.getItems = (req, res, next) => {
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
  Item.findItemsByQuery({}, opt).then(items => {
    res.success(items);
  }).catch(next);
};

/**
 * @api {post} /items 新增商品
 * @apiName 新增商品
 * @apiGroup 商品
 *
 * @apiParam name 商品名称
 * @apiParam picture_url 商品图片URL
 * @apiParam price 商品价格
 */
itemController.newItem = (req, res, next) => {
  const body = req.body;
  if (!body.name || !body.picture_url || !body.price) {
    throw new HttpError.BadRequestError();
  }

  const _item = new Item({
    name: body.name,
    picture_url: body.picture_url,
    price: body.price
  });

  Item.createNewItem(_item).then(item => {
    res.success(item, 201);
  }).catch(next);
};



/*
 * @Router: /items/:itemId
 */
itemController.getItem = (req, res, next) => {
  const itemId = req.params.itemId;
  Item.findItemById(itemId).then(item => {
    if(!item) {
      throw new HttpError.NotFoundError("The item is not exist");
    }
    res.success(item, 200);
  }).catch(next);
};

itemController.updateItem = (req, res, next) => {
  const body = req.body;
  if(!body.name || !body.picture_url || !body.price) {
    throw new HttpError.BadRequestError();
  }
  const itemId = req.params.itemId;
  Item.findItemById(itemId).then(item => {
    const _item = Object.assign(item, {
      name: body.name,
      picture_url: body.picture_url,
      price: body.price
    });
    return Item.updateItem(_item);
  }).then(item => {
    res.success(item, 201)
  }).catch(next);
};

itemController.removeItem = (req, res, next) => {
    const itemId = req.params.itemId;
    if(!utils.isObjectId(itemId)) {
      throw new HttpError.NotFoundError('The item is not found');
    }
    Item.removeItemById(itemId).then(() => {
      res.success({a: 1}, 204);
    }).catch(next);
};
module.exports = itemController;
