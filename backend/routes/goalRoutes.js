const express = require('express')
const { getGoals, setGoal, updateGoals, deleteGoals } = require('../controllers/goalControllers')
const router = express.Router()

// router.get('/', getGoals)

router.route('/').get(getGoals).post(setGoal)

router.route('/:id').put(updateGoals).delete(deleteGoals)


// router.post('/', setGoal)

// router.put('/:id', updateGoals)

// router.delete('/:id', deleteGoals)



module.exports = router