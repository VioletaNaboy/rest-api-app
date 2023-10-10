const Contact = require('./schemas/contact');
const User = require('./schemas/auth');
const bcrypt = require('bcrypt');
const { HttpError } = require('../errorshandlers/index');
const { signToken } = require('./jwtService');
const { userSchema } = require('../schemas/auth');
const ImageService = require('./imagesService');

const listContacts = async (userId) => {
  const contacts = await Contact.find({ owner: userId });
  if (!contacts || contacts.length === 0) {
    throw HttpError(404, "Not Found");
  }
  return contacts;
}

const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, owner: userId });
  if (!contact) {
    throw HttpError(404, `${contactId} is not valid id`);
  }
  return contact;
}

const removeContact = async (contactId, userId) => {
  const contact = await Contact.findByIdAndRemove({ _id: contactId, owner: userId });
  if (!contact) {
    throw HttpError(404, `${contactId} is not valid id`);
  }
  return contact;
}

const addContact = async (body, userId) => {
  return Contact.create({...body, owner: userId });
}

const updateContact = async (contactId, body, userId) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, body, { new: true });
  if (!contact) {
    throw HttpError(404, `${contactId} is not valid id`);
  }
  return contact;
}

const updateStatusContact = async (contactId, body, userId) => {
  const contact = await Contact.findByIdAndUpdate({ _id: contactId, owner: userId }, body, { new: true });
  if (!contact) {
    throw HttpError(404, `${contactId} is not valid id`);
  }
  return contact;
}


const checkUserExists =  (email) => User.findOne(email);

const signupUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10)
  const newUser = await User.create({...userData, password: hashedPassword});
  return newUser;
}

const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email }).select('+password');
  const passwordIsValid = await bcrypt.compare(userData.password, user.password);
  if (!passwordIsValid) {
    throw HttpError(401, "Email or password is wrong");
  } 
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

const updateUserAvatar = async (userData, user, file) => {
  if (!file) {
   throw HttpError(400, "No file chosen"); 
  }
  if (file) {
    user.avatarURL = await ImageService.save(file, {}, 'public', 'avatars')
  }
  Object.keys(userData).forEach((key) => { user[key] = userData[key] });
  return user.save();
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
  checkUserExists, logoutUser, updateUser, updateUserAvatar
}