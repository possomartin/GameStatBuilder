const express = require('express');
const router = express.Router();

const Category = require('../db/models/category,model');

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

/* Get all Categories */

router.get('/all', (req, res) => {
    Category.getAllCategories((err, category) => 
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(category);
        }
    });
});

/* Get all Categories */

router.get('/', isAuth, (req, res) => {
    Category.getAllCategories((err, category) => 
    {
        if(err)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(category);
        }
    });
});

/* Get One Category */

router.get('/:id', isAuth, (req, res) => 
{
    Category.getByID(req.params.id, (err, category) => {
        if(err) throw err;

        if(!category)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(category);
        }
    });
});

/* Add new Category */

router.post('/', isAuth, (req, res) => {
    let newCategory = new Category({
        name: req.body.name
    });

    Category.addCategory(newCategory, (err, category) => 
    {
        if(err)
        {
            res.sendStatus(406);
        }
        else
        {
            res.status(201).send(category);
        }
    });
});

/* Update Category*/

router.patch('/:id', isAuth, (req, res) => {
    Category.updateCategory(req.params.id, req.body, (err, category) => 
    {
        if(err) throw err;

        if(!category)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(category);
        }
    });
});

/*Delete Category */

router.delete('/:id', isAuth, (req, res) => {
   Category.deleteCategory(req.params.id, (err, category) => {
       if(err)
       {
           res.sendStatus(404);
       }
       else
       {
           res.status(200).send(category);
       }
   });
});

module.exports = router;