const mongoose = require('mongoose');

const GameStatSchema = mongoose.Schema({
    _gameID:
    {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _boostID:
    {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const GameStat = module.exports = mongoose.model('GameStat', GameStatSchema);

/* Get All GameStats */

module.exports.getAllGameStats = (callback) =>
{
    GameStat.find(callback);
}

/* Get All GameStats by Game */

module.exports.getAllGameStatsByGame = (gameID, callback) =>
{
    let query = {_gameID: gameID};

    GameStat.find(query, callback);
}

/* Get GameStat by Boost */

module.exports.getByBoost = (boostID, callback) =>
{
    let query = {_boostID: boostID};

    GameStat.findOne(query, callback);
}

/* Get GameStat by ID */

module.exports.getByID = (id, callback) =>
{
    GameStat.findById(id, callback);
}

/* Add new GameStat */

module.exports.addGameStat = (newGameStat, callback) =>
{
    newGameStat.save(callback);
}

/* Update GameStat */

module.exports.updateGameStat = (id, newData, callback) =>
{
    GameStat.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Remove GameStat */

module.exports.deleteGameStat = (id, callback) =>
{
    GameStat.findByIdAndRemove(id, callback);
}