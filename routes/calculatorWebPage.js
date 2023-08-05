const express = require('express')
const router = express.Router()
const {answer} = require('../controllers/calculatorWebPage')

router.route('/').post(answer)
module.exports = router 