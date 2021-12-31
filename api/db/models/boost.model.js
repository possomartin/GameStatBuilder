const mongoose = require('mongoose');

const BoostSchema = mongoose.Schema({
    _itemID: 
    {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _statID:
    {
        type: mongoose.Types.ObjectId,
        required: true        
    },
    value:
    {
        type: Number,
        required: true
    }
});

const Boost = module.exports = mongoose.model('Boost', BoostSchema);

/* Get All Boosts */

module.exports.getAllBoosts = (callback) =>
{
    Boost.find(callback);
}

/* Get all Boost by item*/

module.exports.getAllBoostsByItem = (itemID, callback) =>
{
    let query = {_itemID: itemID};
    Boost.find(query, callback);
}

/* Get All boost by stat */

module.exports.getAllBoostsByStat = (statID, callback) =>
{
    let query = {_statID: statID};
    Boost.find(query, callback);
}

/* get one boost by ID */

module.exports.getByID = (id, callback) =>
{
    Boost.findById(id, callback);
}

/* Add new Boost */
module.exports.addBoost = (newBoost, callback) =>
{
    newBoost.save(callback);
}

/* update a boost */

module.exports.updateBoost = (id, newData, callback) =>
{
    Boost.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Remove a Boost */

module.exports.deleteBoost = (id, callback) =>
{
    Boost.findByIdAndRemove(id, callback);
}