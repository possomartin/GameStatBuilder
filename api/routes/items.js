const express = require('express');
const router = express.Router();

const Item = require('../db/models/item.model');
const Boost = require('../db/models/boost.model');
const GameStat = require('../db/models/gamestat.model');

const storage = require('../helpers/storage');

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

/* Get All Items */

router.get('/all', (req, res) => {
    Item.getAllitems((err, items) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            
            res.status(200).send(items);
        }
    });
});


/* Get All Items */

router.get('/', isAuth, (req, res) => {
    Item.getAllitems((err, items) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(items);
        }
    });
});

/* Get item by ID */

router.get('/:id', (req, res) =>
{
    Item.getByID(req.params.id, (err, item) => {
        if(err) throw err;

        if(!item)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(item);
        }
    });
});

/* Get item by Game */

router.get('/game/:id', (req, res) =>
{
    Item.getByGame(req.params.id, (err, items) => {
        if(err) throw err;

        if(!items)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(items);
        }
    });
});

/* add new Item */

router.post('/', storage, isAuth, (req, res) =>
{
    var path = 'http://localhost:3000/images/' + req.file.filename; // set path dynamically if want to deploy

    let newItem = new Item({
        _categoryID: req.body._categoryID,
        _gameID: req.body._gameID,
        name: req.body.name,
        imagePath: path
    });

    Item.addItem(newItem, (err, item) =>
    {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(item);
        }
    });
});

/*  Update Item */

router.patch('/:id', storage, isAuth, (req, res) => {

    var updateBody = {};

    if(req.file)
    {
        var path = 'http://localhost:3000/images/' + req.file.filename; // set path dynamically if want to deploy

        updateBody = 
        {
            _categoryID: req.body._categoryID,
            _gameID: req.body._gameID,
            name: req.body.name,
            imagePath: path        
        }

        console.log(req.file);
    }
    else
    {
        updateBody = req.body;
    }

    Item.updateItem(req.params.id, updateBody, (err, item) => {
        if(err)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(item);
        }
    });
});

/* Delete Item */

router.delete('/:id', isAuth, (req, res) => {
    Item.deleteItem(req.params.id, (err, item) => {
        Boost.deleteMany({_itemID: item._id},(err, boosts) => {
            GameStat.deleteMany({_itemID: item._id}, (err, GameStats) => {
                if(err)
                {
                    res.sendStatus(404);
                }
                else
                {
                    res.status(200).send(item);
                }
            });            
        });
    });
});

module.exports = router;