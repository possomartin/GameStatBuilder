const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    _categoryID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _gameID:
    {
        type: mongoose.Types.ObjectId,
        required: true        
    },
    name: 
    {
        type: String,
        required: true
    },
    imagePath:
    {
        type: String,
        required: false
    }
});

const Item = module.exports = mongoose.model('Item', ItemSchema);

/* Get Item by ID */

module.exports.getByID = (id, callback) =>
{
    Item.findById(id, callback);
}

/* Get Item by Game */
module.exports.getByGame = (id, callback) =>
{
    Item.find({_gameID: id}, callback);
}

/* Get All by Category */

module.exports.getAllitems = (categoryID, callback) =>
{
    let query = {_categoryID: categoryID};
    Item.find(query, callback);
}

/* get All by Game */

module.exports.getAllitems = (gameID, callback) =>
{
    let query = {_gameID: gameID};
    Item.find(query, callback);
}

/* Get All Items */

module.exports.getAllitems = (callback) =>
{
    Item.find(callback);
}

/* Add Item */

module.exports.addItem = (newItem, callback) =>
{
    newItem.save(callback);
}

/* Update Item */

module.exports.updateItem = (id, newData, callback) =>
{
    Item.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Remove Item */

module.exports.deleteItem = (id, callback) =>
{
    Item.findByIdAndRemove(id, callback);
}