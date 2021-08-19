const router = require('express-promise-router')()

const userController = require('../controllers/userController')
const { validateParam, schemas, validateBody } = require('../helper/routerHelper')

const passport = require('passport')
const passportConfig = require('../middleware/passport')

router.route('/auth/google').post(passport.authenticate('google-plus-token', { session: false }), userController.authGoogle)
router.route('/auth/facebook').post(passport.authenticate('facebook-token', { session: false }), userController.authFacebook)

router.route('/secret').get(passport.authenticate('jwt', { session: false }), userController.secret)
router.route('/sign-up').post(validateBody(schemas.authSignUpSchema), userController.signUp)
router.route('/sign-in').post(validateBody(schemas.authSignInSchema), passport.authenticate('local', { session: false }), userController.signIn)

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
