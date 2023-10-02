const jwt = require('jsonwebtoken');
const { HttpError } = require('../errorshandlers/index')


const signToken = id => 
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const checkToken = token => {
    if (!token) {
       throw HttpError(401, "Not logged in...")
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(id)
        return id;
    }
    catch (error){
        throw HttpError(401, "Not logged in...");
    }
}

module.exports = { signToken, checkToken };