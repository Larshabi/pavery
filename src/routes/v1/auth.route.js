const { Router } = require('express');
const AuthController = require('../../controllers/auth/auth.controller');
const asyncHandler = require('../../helpers/AsyncHandler');

const router = Router();

router.post('/user/register', asyncHandler(AuthController.userRegistration));

router.post('/user/login', asyncHandler(AuthController.userLogin));

router.get('/verify-email/:hash', asyncHandler(AuthController.verifyEmail));

router.post('/reset-password', asyncHandler(AuthController.resetPassword));

router.patch('/update-password/:hash', asyncHandler(AuthController.updatePassword));

router.post('/refresh-email', asyncHandler(AuthController.refreshEmail));

router.post('/refresh-token', asyncHandler(AuthController.refreshToken));

router.get('/verify-token/:hash', asyncHandler(AuthController.verifyTokenValidity));
module.exports = router;