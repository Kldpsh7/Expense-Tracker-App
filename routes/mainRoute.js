const path = require('path');
const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController');

router.get('/',mainController.getHome);
router.post('/postExpense',mainController.postExpense);
router.get('/getExpenses',mainController.getExpenses);
router.get('/deleteItem',mainController.getDeleteItem)

module.exports = router;