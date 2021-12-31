const express = require('express');
const storage = require('../helpers/storage');
const router = express.Router();

const Game = require('../db/models/game.model');


//Authorization
const isAuth = (req, res, next) => {
    if(req.session.isAuth & (req.session.roleId == "618732e84ac13f5361714794"))
    {
        next()
    }
    else{
        res.status(401).json({success: false, msg: 'No Authorization'});
    }
}

/* Get all Games*/

router.get('/all', (req, res) => {
    Game.getAllGames((err, games) => {
        if(err) throw err;

        if(!games)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(games);
        }
    });
});


/* Get all Games*/

router.get('/', isAuth, (req, res) => {
    Game.getAllGames((err, games) => {
        if(err) throw err;

        if(!games)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(games);
        }
    });
});

/* Get Game */

router.get('/:id', (req, res) => 
{
    Game.getByID(req.params.id, (err, game) => {
        if(err) throw err;
        if(!game)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(game);
        }
    });
});

/* Add new Game */

router.post('/', storage, isAuth, (req, res) => {

    var path = 'http://localhost:3000/images/' + req.file.filename; // set path dynamically if want to deploy

    let newGame = new Game({
        name: req.body.name,
        description: req.body.description,
        imagePath: path
    });
    Game.addGame(newGame, (err, game) => {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(game);
        }
    });
});

/* Update Game */

router.patch('/:id', storage, isAuth, (req, res) => {

    var updateBody = {};

    if(req.file)
    {
        var path = 'http://localhost:3000/images/' + req.file.filename; // set path dynamically if want to deploy

        updateBody = 
        {
            name: req.body.name,
            description: req.body.description,
            imagePath: path    
        }

        console.log(req.file);
    }
    else
    {
        updateBody = req.body;
    }    

    Game.updateGame(req.params.id, updateBody, (err, game) => {
        if(err) throw err;
        
        if(!game)
        {
            req.sendStatus(304);
        }
        res.status(200).send(game);
    });
});

/* Delete Game */

router.delete('/:id', isAuth, (req, res) => {
    Game.deleteGame(req.params.id, (err, user) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(user);
        }
    });
     
});

module.exports = router;