var mongoose = require('mongoose');

//Schema for shopping item
var ShoppingItemSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        required: true
    },
    itemBought: {
        type: Boolean,
        required: true
    }
});

//Apply schema on item
var Item = module.exports = mongoose.model('Item', ShoppingItemSchema);