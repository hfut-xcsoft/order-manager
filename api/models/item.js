const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

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

ItemSchema.statics = {
  findItemsByQuery: function (query, opt) {
    return this.find(query, {}, opt).exec();
  }
};

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;



