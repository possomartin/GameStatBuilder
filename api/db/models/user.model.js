const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    _roleId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);


/* get all users */

module.exports.getAllUsers = (callback) =>
{
    User.find(callback);
}

/* get by Username */
module.exports.getUserByUsername = (username, callback) => 
{
    const query = {username: username}
    User.findOne(query, callback);
}

/* get all by Role */
module.exports.getUserByRole = (roleID, callback) =>
{
    const query = {_roleID: roleID};
    User.find(query, callback);
}

/* get by Id */
module.exports.getUserById = (id, callback) => 
{
    User.findById(id, callback);
}

/* Add User */
module.exports.addUser = (newUser, callback) => 
{
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        })
    })
}

/* Update User */

module.exports.updateUser = (id, newData, callback) => {
    User.findOneAndUpdate({_id: id}, {$set: newData}, callback);
}

/* Delete User */ 
module.exports.deleteUser = (id, callback) => 
{
    User.findByIdAndRemove(id, callback);
}

/* compare password */
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
}