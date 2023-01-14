const CategoryController = require('../../controllers/products/category.controller');
const {Router} = require('express');
const asyncHandler = require('../../helpers/AsyncHandler');
const auth = require('../../helpers/Authorization');

const router = Router();

router.post('/', auth, asyncHandler(CategoryController.createCategory));

router.get('/', auth, asyncHandler(CategoryController.getCategories));

router.get('/:id', auth, asyncHandler(CategoryController.getACategory));

router.patch('/:id', auth, asyncHandler(CategoryController.updateCategory));

module.exports = router;