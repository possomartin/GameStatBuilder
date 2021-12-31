const mongoose = require('mongoose');
const { addItem } = require('./item.model');

const StatSchema = mongoose.Schema({
    name:
    {
        type: String,
        required: true
    },
});

const Stat = module.exports = mongoose.model('Stat', StatSchema);

/* Get all Stats */

module.exports.getAllStats = (callback) =>
{
    Stat.find(callback);
}

/* Get Stat by ID*/

module.exports.getById = (id, callback) =>
{
    Stat.findById(id, callback);
}

/* Get Stat by Name */

module.exports.getByName = (name, callback) =>
{
    let query = {name: name};
    Stat.findOne(query, callback);
}

/* Add New Stat */

module.exports.addStat = (newStat, callback) =>
{
    newStat.save(callback);
}

 /* Update Stat */
module.exports.updateStat = (id, newData, callback) =>
{
    Stat.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Remove stat */

module.exports.delteStat = (id, callback) =>
{
    Stat.findByIdAndRemove(id, callback);
}


