const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    price: Number,
    inventory: Number,
    nextDelivery: String,
    deliveryAmt: Number,
    name: String
})

const Item = mongoose.model('Item', itemSchema) 

module.exports = Item;

