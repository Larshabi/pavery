const ItemController = require('../../controllers/products/item.controller');
const {Router} = require('express');
const asyncHandler = require('../../helpers/AsyncHandler');
const auth = require('../../helpers/Authorization');

const router = Router();

router.post('/', auth, asyncHandler(ItemController.createItem));

module.exports = router;