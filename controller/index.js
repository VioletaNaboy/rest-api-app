const contacts = require('../service/index')

const { HttpError } = require('../errorshandlers/index')


const listContacts = async (req, res, next) => {
  try {
  const result = await contacts.listContacts(req.user._id);
  res.status(200).json(result)
  } catch (error) {
    next(error)
  }
  
}

const getContactById = async (req, res, next) => {
  try {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId, req.user._id);
    res.status(200).json(contact);
  } catch (error) {
    next(error)
  }
}

const addContact = async (req, res, next) => {
  try {
  const contact = await contacts.addContact(req.body, req.user._id);
  res.status(201).json(contact);
  } catch (error) {
    next(error)
  }
}

const removeContact = async (req, res, next) => {
  try {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId, req.user._id);
  res.status(200).json({
  message: "Contact deleted successfully"
    })
  } catch (error) {
    next(error)
  }
  
}
  
const updateContact = async (req, res, next) => {
  try {
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, req.body, req.user._id);
  if (!contact) {
      throw HttpError(404, 'Not found');
  }
  res.status(200).json(contact);
  }
  catch(error) {
    next(error)
  }
  }
const updateStatusContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.updateStatusContact(contactId, req.body, req.user._id);
res.status(200).json(contact);
  }
  catch (error) {
    next(error)
  }
}
module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}