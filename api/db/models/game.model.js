const mongoose = require('mongoose');

const GameShcema = new mongoose.Schema
({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath:
    {
        type: String,
        required: false
    }
});

const Game = module.exports = mongoose.model('Game', GameShcema);

/* Get All Games*/

module.exports.getAllGames = (callback) => {
    Game.find(callback);
}

/* Get By ID */

module.exports.getByID = (id, callback) => {
    Game.findById(id, callback);
}

/* Get by Name */

module.exports.getByName = (name, callback) => {
    const query = {name: name};
    Game.findOne(query, callback);
}

/* Add Game */

module.exports.addGame = (newGame, callback) => {
    newGame.save(callback);
}

/* Update Game */

module.exports.updateGame = (id, newData, callback) => {
    Game.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Delete Game */

module.exports.deleteGame = (id, callback) =>
{
    Game.findByIdAndRemove(id, callback);
}