const ItemController = require('../../controllers/products/item.controller');
const {Router} = require('express');
const asyncHandler = require('../../helpers/AsyncHandler');
const auth = require('../../helpers/Authorization');

const router = Router();

router.post('/', auth, asyncHandler(ItemController.createItem));

router.get('/download', asyncHandler(ItemController.downloadTemplate));

router.get('/', auth, asyncHandler(ItemController.getItems));

router.get('/:id', auth, asyncHandler(ItemController.getItem));

router.patch('/:id', auth, asyncHandler(ItemController.updateItem))

module.exports = router;