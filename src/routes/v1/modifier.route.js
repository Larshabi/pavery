const ModifierController = require('../../controllers/products/modifier.controller');
const {Router} = require('express');
const asyncHandler = require('../../helpers/AsyncHandler');
const auth = require('../../helpers/Authorization');

const router = Router();

router.post('/', auth, asyncHandler(ModifierController.modifierCreate));

router.get('/', auth, asyncHandler(ModifierController.getModifiers));

router.get('/:id', auth, asyncHandler(ModifierController.getAmodifier));

router.patch('/:id', auth, asyncHandler(ModifierController.updateModifier));

module.exports = router;