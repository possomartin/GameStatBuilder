const express = require('express');
const router = express.Router();

const Role = require('../db/models/role.model');

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

/* get all roles */

router.get('/', isAuth, (req, res) => {
    Role.getAllRoles((err, roles) => {
        if(err) throw err;
        if(!roles)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(roles);
        }
    });
});

/* Get Role */

router.get('/:id', isAuth, (req, res) => 
{
    Role.getByID(req.params.id, (err, role) => {
        if(err) throw err;
        if(!role)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(role);
        }
    });
});

/* Add new Role */

router.post('/', isAuth, (req, res) => {
    let newRole = Role(
        {
            name: req.body.name
        }
    );
    Role.addRole(newRole, (err, role) => {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(role);
        }
    });
});

/* Update Role */

router.patch('/:id', isAuth, (req, res) => {
    Role.updateRole(req.params.id, req.body, (err, role) =>
    {
        if(err) throw err;

        if(!role)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(role);
        }
    });
});

 /* Remove Role */

router.delete('/:id', isAuth, (req, res) => {
    Role.deleteRole(req.params.id, (err, role) => {
        if(err) throw err;

        if(!role)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(role);
        }

    });
});

module.exports = router;