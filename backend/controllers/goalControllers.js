const asyncHandler = require('express-async-handler')
const goal = require('../models/goalModel')
const user = require('../models/userModel') 


//method:  GET   
//route:  /api/goals


const getGoals = asyncHandler(async (req, res) => {
    
    const goals = await goal.find({user: req.user.id})
    res.status(200).json(goals)
})


//method  POST
//route:  /api/goals


const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw Error('please send data')
    }

    const setGoal = await goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(setGoal)
})



//method  PUT
//route:  /api/goals/:id


const updateGoals = asyncHandler(async (req, res) => {
   
    const fetchGoal = await goal.findById(req.params.id)                                                                     // if no id error is handled by error handler not throwing error
    


    if (!fetchGoal) {
        res.status(400)
        throw new Error('please check the id ')
    }
    const fetchUser = await user.findById(req.user.id)

    if(!fetchUser){
        res.status(401)
        throw new Error ('user not found');
    }

    if(fetchGoal.user.toString() !== fetchUser.id ){
         res.status(401)
         throw new Error ('user not authorised')
    }

    const updateGoal = await goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updateGoal)
})



//method  DELETE
//route:  /api/goals/:id


const deleteGoals = asyncHandler(async (req, res) => {

    const fetchGoal = await goal.findById(req.params.id)                                                                     // if no id error is handled by error handler not throwing error
    


    if (!fetchGoal) {
        res.status(400)
        throw new Error('please check the id ')
    }

    const fetchUser = await user.findById(req.user.id)

    if(!fetchUser){
        res.status(401)
        throw new Error ('user not found');
    }

    if(fetchGoal.user.toString() !== fetchUser.id ){
         res.status(401)
         throw new Error ('user not authorised')
    }
    const deleteGoal = await goal.findByIdAndRemove(req.params.id)                                            //OR  fetchGoal.remove() 

    res.status(200).json({ deleteGoalId: deleteGoal._id })
})




module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals
}
