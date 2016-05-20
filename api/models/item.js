const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ItemSchema = new Schema({
  name: { type: String },
  count: { type: Number },
  picture_url: { type: String },
  price: { type: Number },
  status: { type: Number },
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now},
  finished_at: { type: Date },
  __v: { type: Number, select: false }
});

const Item = mongoose.model('Item', ItemSchema);



