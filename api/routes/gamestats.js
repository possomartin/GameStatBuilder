const express = require('express');
const router = express.Router();

const GameStat = require('../db/models/gamestat.model');
const {PythonShell} = require('python-shell');

/* Get All GameStats */

router.get('/', (req, res) =>
{
    GameStat.getAllGameStats((err, gamestats) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(gamestats);
        }
    });
});

/* Get All GameStats by GameID*/

router.get('/games/:gameID', (req, res) =>
{
    GameStat.getAllGameStatsByGame(req.params.gameID, (err, gamestats) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(gamestats);
        }
    });
});

/* Get GameStat by Boost*/

router.get('/boosts/:boostID', (req, res) =>
{
    GameStat.getByBoost(req.params.boostID, (err, gamestat) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(gamestat);
        }
    });
});

/* Get GameStat by ID*/

router.get('/:id', (req, res) =>
{
    GameStat.getByID(req.params.id, (err, gamestat) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(gamestat);
        }
    });
});

/* Add new GameStat */

router.post('/', (req, res) =>
{
    let newGameStat = new GameStat({
        _gameID: req.body._gameID,
        _boostID: req.body._boostID
    });
    GameStat.addGameStat(newGameStat, (err, gamestat) => {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(200).send(gamestat);
        }
    });
});

/* Update GameStat */

router.patch('/:id', (req, res) => {
    GameStat.updateGameStat(req.params.id, req.body, (err, gamestat) =>
    {
        if(err) throw err;

        if(!gamestat)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(gamestat);
        }
    });
});

/* Delete GameStat */

router.delete('/:id', (req, res) => {
    GameStat.deleteGameStat(req.params.id, (err, gamestat) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(gamestat);
        }
    });
});

/* Calculate best Items Combo */

router.get('/calculate/:game/:itemName', (req, res) => {
    let option = {
        mode: 'text',
        args: [req.params.game, req.params.itemName] //it can be access with sys.argvs[1..2..n]
    }
    PythonShell.run('./Python/Calculator.py', option, (err, data) => {
        if(err) throw err;
        res.status(200).send(JSON.parse(data[0]));
    });
});

router.get('/compare/:game/:value1/:value2', (req, res) => {
    let option1 = {
        mode: 'text',
        args: [req.params.game, req.params.value1] //it can be access with sys.argvs[1..2..n]
    } 
    let option2 = 
    {
        mode: 'text',
        args: [req.params.game, req.params.value2] //it can be access with sys.argvs[1..2..n]        
    }

    //Variables para mejor resultados para las busquedas
    var mejor1;
    var mejor2;

    // Python para obtener el mejor resultado del primer valor
    PythonShell.run('./Python/Calculator.py', option1, (err, data1) => {
        if(err) throw err;
        mejor1 = JSON.parse(data1[0]);

        // Python para obtener el mejor resultado del segundo valor
        PythonShell.run('./Python/Calculator.py', option2, (err, data2) => {
            if(err) throw err;
            mejor2 = JSON.parse(data2[0]);

            console.log(mejor1, mejor2);
            if(mejor1 && mejor2)
            {
                if(mejor1.total > mejor2.total)
                {
                    res.send(mejor1);
                }
                else if(mejor2.total == mejor1.total)
                {
                    res.send({mejor1, mejor2});
                }
                else
                {
                    res.send(mejor2);
                }
            }
        
        }); 
        
    });
});

module.exports = router;