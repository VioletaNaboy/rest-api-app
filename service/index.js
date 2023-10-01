const Contact = require('./schemas/contact')
const User = require('./schemas/auth')
const { signToken } = require('./jwtService')

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

const signupUser = async (userData) => {
  const newUser = User.create(userData);
  newUser.password = undefined;
  const token = signToken(newUser._id);

  return { user: newUser, token };

}

const loginUser = async (userData) => {
  const newUser = User.create(userData);
  newUser.password = undefined;
  // const token = signToken(newUser.id);

  // return { user: newUser, token };

}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  signupUser,
  loginUser
}