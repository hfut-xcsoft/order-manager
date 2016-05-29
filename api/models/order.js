const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cache = require('../common/cache');

const OrderSchema = new Schema({
  number: { type: Number },
  status: { type: Number, default: 0 },
  items: { type: Array },
  total_price: { type: Number },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  finished_at: { type:Date },
  __v: { type: Number, select: false }
});

OrderSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

OrderSchema.statics = {
  findOrdersByQuery: function(query, opt) {
    return cache.getSet(`orders:query:${JSON.stringify(query)}:${JSON.stringify(opt)}`, () => {
      return this.find(query, {}, opt).exec();
    });
  },
  createNewOrder: function(order) {
    cache.delMulti('orders:query:*');
    return order.save();
  },
  findOrderById: function(orderId, disableCache) {
    return cache.getSet(`orders:id:${orderId}`, () => {
      return this.findById(orderId).exec();
    }, disableCache);
  },
  updateOrder: function(order) {
    cache.del(`orders:id:${order._id}`);
    cache.delMulti(`orders:query:*`);
    return order.save();
  },
  updateOrderItems: function (orderId, items) {
    cache.del(`orders:id:${orderId}`);
    cache.delMulti(`orders:query:*`);
    return this.update({_id: orderId}, {$set: {items: items, updated_at: Date.now()}}).exec();
  },
  removeOrderById: function(orderId) {
    cache.del(`orders:id:${orderId}`);
    cache.delMulti(`orders:query:*`);
    return this.remove({'_id': orderId}).exec();
  }
  
};

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
