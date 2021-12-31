const mongoose = require('mongoose');

const CategoryScheme = new mongoose.Schema
({
    name:
    {
        type: String,
        required: true
    }
});

const Category = module.exports = mongoose.model('Category', CategoryScheme);

/* Get All Categories */

module.exports.getAllCategories = (callback) => 
{
    Category.find(callback);
}

/* Get by ID */

module.exports.getByID = (id, callback) => 
{
    Category.findById(id, callback);
}

module.exports.getByName = (name, callback) =>
{
    const query = {name: name};
    Category.findOne(query, callback);
}

/* Add new Category */

module.exports.addCategory = (newCategory, callback) =>
{
    newCategory.save(callback);
}

/* Update Category */

module.exports.updateCategory = (id, newData, callback) =>
{
    Category.findByIdAndUpdate(id, {$set: newData}, callback);
}

/* Delete Category */

module.exports.deleteCategory = (id, callback) =>
{
    Category.findByIdAndRemove(id, callback);
}

