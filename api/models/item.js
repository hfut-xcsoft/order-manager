const mongoose = require('mongoose');
const cache = require('../common/cache');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String },
  picture_url: { type: String },
  price: { type: Number },
  sales_count: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now},
  finished_at: { type: Date },
  status: { type: Number },
  count: { type: Number },
  __v: { type: Number, select: false }
});

ItemSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

ItemSchema.statics = {
  findItemsByQuery: function (query, opt) {
    return cache.getSet(`items:all:${JSON.stringify(query)}:${JSON.stringify(opt)}`, () => {
      return this.find(query, {}, opt).exec();
    });
  },
  createNewItem: function(item) {
    cache.delMulti('items:all:*');
    return item.save();
  },
  findItemById: function(itemId, disableCache) {
    return cache.getSet('items:id:' + itemId, () => {
      return this.findById(itemId).exec();
    }, disableCache);
  },
  updateItem: function(item) {
    cache.del('items:id:' + item._id);
    cache.delMulti('items:all:*');
    return item.save();
  },
  addItemSaleCount: function (itemId, count) {
    cache.delMulti('items:*');
    return this.update({_id: itemId}, {$inc: {sales_count: count}}).exec()
  },
  removeItemById: function(itemId) {
    cache.del('items:id:' + itemId);
    cache.delMulti('items:all:*');
    return this.remove({'_id': itemId}).exec();
  }
};

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;
