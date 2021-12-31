const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
});

const Role = module.exports = mongoose.model('Role', RoleSchema);

/* get all roles */

module.exports.getAllRoles = (callback) =>
{
    Role.find(callback);
}

/* Get A Role by ID */

module.exports.getByID = (id, callback) =>
{
    Role.findById(id, callback);
}

/* Get A Role By Name */

module.exports.getByName = (_name, callback) =>
{
    const query = {name: _name};
    Role.findOne(query, callback);
}

/* Add New Role */

module.exports.addRole = (newRole, callback) =>
{
    newRole.save(callback);
}

/* Update Role */

module.exports.updateRole = (_id, newData, callback) =>
{
    Role.findByIdAndUpdate(_id, {$set: newData}, callback);
}

/* Delete role */

module.exports.deleteRole = (id, callback) =>
{
    Role.findByIdAndRemove(id, callback);
}