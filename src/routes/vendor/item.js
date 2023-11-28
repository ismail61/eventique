const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/vendor/item');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItem);
router.post('/add', itemController.addNewItem);
router.patch('/:id/update', itemController.updateItem);

module.exports = router;
