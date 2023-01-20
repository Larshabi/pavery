const {Router} = require('express');
const asyncHandler = require('../../helpers/AsyncHandler');
const auth = require('../../helpers/Authorization');
const StoreController = require('../../controllers/store/store.controller');

const router = Router();

router.get('/',auth, asyncHandler(StoreController.getStores));

router.get('/:id',auth, asyncHandler(StoreController.getStore));

router.patch('/:id', auth, asyncHandler(StoreController.updateStore));

router.post('/', auth, asyncHandler(StoreController.createStore));


module.exports = router;