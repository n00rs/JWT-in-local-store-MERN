const express = require('express')
const { getGoals, setGoal, updateGoals, deleteGoals } = require('../controllers/goalControllers')
const { protect } = require('../middleWare/authMiddlewarre')
const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoal)

router.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals)

module.exports = router