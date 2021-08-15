const router = require('express-promise-router')()

const userController = require('../controllers/userController')
const { validateParam, schemas, validateBody } = require('../helper/routerHelper')

router.route('/')
    .get(userController.index)
    .post(validateBody(schemas.userSchema), userController.newUser)

router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID'), userController.getUser)
    .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), userController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), userController.updateUser)

router.route('/:userID/desk')
    .get(validateParam(schemas.idSchema, 'userID'), userController.getUserDeck)
    .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), userController.newUserDeck)

module.exports = router