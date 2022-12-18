const { Router } = require('express');
const AuthController = require('../../controllers/auth/auth.controller');
const asyncHandler = require('../../helpers/AsyncHandler');

const router = Router();

router.post('/user/register', asyncHandler(AuthController.userRegistration));

router.post('/user/login', asyncHandler(AuthController.userLogin))

module.exports = router;