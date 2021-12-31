const express = require('express');
const router = express.Router();

const Boost = require('../db/models/boost.model');

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

/* Get All Boost User */

router.get('/all', (req, res) =>
{
    Boost.getAllBoosts((err, boosts) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(boosts);
        }
    })
});


/* Get All Boost */

router.get('/', isAuth, (req, res) =>
{
    Boost.getAllBoosts((err, boosts) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(boosts);
        }
    })
});


/* Get Boost By ID*/

router.get('/:id', isAuth, (req, res) =>
{
    Boost.getByID(req.params.id, (err, boost) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(boost);
        }
    });
});

/* Add New Boost */

router.post('/', isAuth, (req, res) => {
    let newBoost = new Boost({
        _itemID: req.body._itemID,
        _statID: req.body._statID,
        value: req.body.value
    });
    Boost.addBoost(newBoost, (err, boost) => {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(boost);
        }
    });
});

/* Update Boost */

router.patch('/:id', isAuth, (req, res) => {
    Boost.updateBoost(req.params.id, req.body, (err, boost) =>
    {
        if(err) throw err;

        if(!boost)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(boost);
        }
    });
});

/* Remove Boost */

router.delete('/:id', isAuth, (req, res) =>
{
    Boost.deleteBoost(req.params.id, (err, boost) =>
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(boost);
        }
    });
});

module.exports = router;