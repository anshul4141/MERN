// services/userService.js
const User = require('../bean/userBean');

const addUser = (userData) => {
    const newUser = new User(userData);
    return newUser.save()
        .then(savedUser => ({ user: savedUser, message: 'Data added successfully' }))
        .catch(error => { throw new Error(error.message); });
};

const updateUser = (userId, updateData) => {
    return User.findByIdAndUpdate(userId, updateData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) throw new Error('User not found');
            return updatedUser;
        })
        .catch(error => { throw new Error(error.message); });
};

const deleteUser = (userId) => {
    return User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) throw new Error('User not found');
            return { message: 'User deleted successfully' };
        })
        .catch(error => { throw new Error(error.message); });
};

const getUserById = (userId) => {
    return User.findById(userId)
        .then(user => {
            if (!user) throw new Error('User not found');
            return user;
        })
        .catch(error => { throw new Error(error.message); });
};

const searchUsers = (query) => {
    console.log('in search routing');
    return User.find(query)
        .then(users => users)
        .catch(error => { throw new Error(error.message); });
};

const authenticateUser = (loginId, password) => {
    return User.findOne({ loginId, password })
        .then(user => {
            if (!user) throw new Error('Invalid credentials');
            return { message: 'Authentication successful', user };
        })
        .catch(error => { throw new Error(error.message); });
};

module.exports = {
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    searchUsers,
    authenticateUser
};