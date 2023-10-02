const express = require('express')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require('../../controller/index')
const { validateData, checkId, protect } = require('../../middlewares')
const { addSchema, validateBodyFavorite } = require('../../schemas/contacts')



router.get('/', protect, listContacts)

router.get('/:contactId', protect, checkId, getContactById)

router.post('/', protect, validateData(addSchema), addContact)

router.delete('/:contactId', protect, checkId, removeContact)

router.put('/:contactId', protect, checkId, validateData(addSchema), updateContact)

router.patch('/:contactId/favorite', protect, checkId, validateData(validateBodyFavorite), updateStatusContact)

module.exports = router
