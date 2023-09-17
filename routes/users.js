const router = require('express').Router();
const { getUser, updateProfile } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validator');

router.get('/me', getUser);
router.patch('/me', validateUpdateUser, updateProfile);

module.exports = router;
