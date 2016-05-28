const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
  number: { type: Number },
  status: { type: Number, default: 0 },
  items: { type: Array },
  total_price: { type: Number },
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now},
  finished_at: { type:Date },
  __v: {type: Number, select: false}
});

OrderSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

OrderSchema.statics = {
  findOrdersByQuery: function(query, opt) {
    return this.find(query, {}, opt).exec();
  },
  createNewOrder: function(order) {
    return order.save();
  },
  findOrderById: function(orderId) {
    return this.findById(orderId).exec();
  },
  updateOrder: function(order) {
    return order.save();
  },
  updateOrderItems: function (orderId, items) {
    return this.update({_id: orderId}, {$set: {items: items}})
  },
  removeOrderById: function(orderId) {
    return this.remove({'_id': orderId}).exec();
  }
  
};

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
