const express = require('express');
const router = express.Router();
const vendorAccountController = require('../../controllers/vendor/account');
const { vendorAuthentication } = require('../../middlewares/authenticate');

router.get('', vendorAuthentication, vendorAccountController.me);
router.patch('', vendorAuthentication, vendorAccountController.update);
router.post('change-password', vendorAuthentication, vendorAccountController.changePassword);

module.exports = router;
