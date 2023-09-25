const express = require('express')
const router = express.Router()
const {listContacts, getContactById, addContact, removeContact, updateContact, updateStatusContact} = require('../../controller/index')
const { validateData, checkId } = require('../../middlewares')
const { addSchema, validateBodyFavorite } = require('../../schemas/contacts')
router.get('/', listContacts)

router.get('/:contactId', checkId, getContactById)

router.post('/', validateData(addSchema), addContact)

router.delete('/:contactId', checkId, removeContact)

router.put('/:contactId', checkId, validateData(addSchema), updateContact)

router.patch('/:contactId/favorite', checkId, validateData(validateBodyFavorite), updateStatusContact)

module.exports = router
