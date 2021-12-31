const express = require('express');
const router = express.Router();

const User = require('../db/models/user.model');

/* Authorization */
const isAuth = (req, res, next) => {
    if(req.session.isAuth & (req.session.roleId == "618732e84ac13f5361714794"))
    {
        next()
    }
    else{
        res.status(401).json({success: false, msg: 'No Authorization'});
    }
}

/* Get User by ID */

router.get('/:id', isAuth, (req, res) => 
{
    User.getUserById(req.params.id, (err, user) => {
        if(err) throw err;
        if(!user)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(user);
        }
    });
});

/* Get All Users */

router.get('/', isAuth, (req, res) => {
    User.getAllUsers((err, users) => {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(users);
        }
    });
});

/* Update User */
router.patch('/:id', isAuth, (req, res) => {
    User.updateUser(req.params.id, req.body, (err, user) => {
        if(err) throw err;

        if(!user)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(user);
        }
    });
})

/* Remove User */
router.delete('/:id', isAuth, (req, res) => {
    User.deleteUser(req.params.id, (err, user) => {
        if(err)
        {
            res.sendStatus(304);
        }
        else
        {
            res.status(200).send(user);
        }
    });
});

/* Add new User */

router.post('/register', (req, res) => {
    let newUser = new User({
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        _roleId: req.body._roleId,
    });

    User.addUser(newUser, (err, user) => {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(user);
        }
    });
});

/* Login to Server */

router.post('/login', (req, res) => {
    let {username, email, password} = req.body;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;

        if(!user)
        {
            res.sendStatus(404);
        }
        else
        {
            User.comparePassword(password, user.password, (err, isMatch) =>
            {
                if(err) throw err;
                
                if(!isMatch)
                {
                    res.sendStatus(406);
                }
                else
                {
                    req.session.isAuth = true;
                    req.session.user = user;
                    req.session.username = user.username;
                    req.session.userId = user._id;
                    req.session.roleId = user._roleId;
                    res.status(200).send(user);
                }
            });
        }
    });
});

/* Log Out */

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) throw err;
        res.status(200).json({msg: "Successfully Logout"});
    })
})

module.exports = router;