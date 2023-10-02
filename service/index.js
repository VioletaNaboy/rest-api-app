const Contact = require('./schemas/contact');
const User = require('./schemas/auth');
const bcrypt = require('bcrypt');
const { HttpError } = require('../errorshandlers/index');
const { signToken } = require('./jwtService');
const { userSchema } = require('../schemas/auth');

const listContacts = async () => {
    return Contact.find()
}

const getContactById = async (contactId) => {
     return Contact.findOne({ _id: contactId })
}

const removeContact = async (contactId) => {
    return Contact.findByIdAndRemove({ _id: contactId })
}

const addContact = async (body) => {
  return Contact.create(body);
}

const updateContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}

const updateStatusContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
}


const checkUserExists =  (email) => User.findOne(email);

const signupUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const newUser = await User.create({...userData, password: hashedPassword});
  return { newUser };
}

const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email }).select('+password');
  const passwordIsValid = await bcrypt.compare(userData.password, user.password);
  if (!passwordIsValid) {throw HttpError(401, "Unauthorized");} 
  user.password = undefined;
  const token = signToken(user.id);
  await User.findByIdAndUpdate(user._id, { token });
  return {user, token}
}

const logoutUser = async (id) => {
return User.findByIdAndUpdate(id, { token: "" });
}

const updateUser = async (id, subscription) => {
return User.findByIdAndUpdate(id, { subscription }, { new: true });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  signupUser,
  loginUser,
  checkUserExists, logoutUser, updateUser
}