const express = require('express');
const router = express.Router();

const Stat = require('../db/models/stat.model');

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

/* Get All Stats */

router.get('/all', (req, res) => {
    Stat.getAllStats((err, stats) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(stats);
        }
    });
});


/* Get All Stats */

router.get('/', isAuth, (req, res) => {
    Stat.getAllStats((err, stats) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(stats);
        }
    });
});

/* Get Stat by ID */

router.get('/:id', isAuth, (req, res) =>
{
    Stat.getById(req.params.id, (err, stat) => {
        if(err) throw err;

        if(!Stat)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(stat);
        }
    });
});

/* add new Stat */

router.post('/', isAuth, (req, res) =>
{
    let newStat = new Stat({
        name: req.body.name
    });

    Stat.addStat(newStat, (err, stat) =>
    {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(stat);
        }
    });
});

/*  Update Stat */

router.patch('/:id', isAuth, (req, res) => {
    Stat.updateStat(req.params.id, req.body, (err, stat) => {
        if(err)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(stat);
        }
    });
});

/* Delete Stat */

router.delete('/:id', isAuth, (req, res) => {
    Stat.delteStat(req.params.id, (err, stat) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(stat);
        }
    });
});

module.exports = router;