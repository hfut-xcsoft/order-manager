const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrderSchema = new Schema({
  number: Number,
  status: Number,
  items: [{}],
  total_price: Number,
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now},
  finished_at: Date,
  __v: {type: Number, select: false}
});

OrderSchema.ststics = {
  findOrdersByQuery: function(query, opt) {
    return this.find(query, {}, opt).exec();
  },
  createNewOrder: function(order) {
    return order.save();
  },
  findOrderById: function(orderId) {
    return this.findById(orderId).exec();
  },
  updateOderById: function(orderId, _order) {
    return this.findById(orderId).then(order => {
      order.status = _order.status;
      const items = _order.items;
      order.items = [];
      for(item in items) {
        order.items.push(item);
      }
      order.save();
    })
  },
  removeOrderById: function(orderId) {
    reutrn this.remove({'_id': orderId}).exec();
  },
  
};

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
