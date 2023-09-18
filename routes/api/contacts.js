const express = require('express')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact} = require('../../controllers/contacts')
const { validateData } = require('../../middlewares')
const schemas = require('../../schemas/contacts')

router.get('/', listContacts)

router.get('/:contactId', getContactById)

router.post('/', validateData(schemas.addSchema), addContact)

router.delete('/:contactId', removeContact)

router.put('/:contactId', validateData(schemas.addSchema), updateContact)
  
module.exports = router