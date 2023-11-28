const express = require('express');
const router = express.Router();
const userAccountController = require('../../controllers/user/account');
const { userAuthentication } = require('../../middlewares/authenticate');

router.get('', userAuthentication, userAccountController.me);
router.patch('', userAuthentication, userAccountController.update);
router.post('change-password', userAuthentication, userAccountController.changePassword);

module.exports = router;
