const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

//login
router.post('/login', authController.login_auth)

//logout
router.post('/logout', authController.logout_auth)

module.export = router;