const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/user/item');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItem);

module.exports = router;
