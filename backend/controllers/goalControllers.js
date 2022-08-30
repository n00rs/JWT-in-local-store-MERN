const asyncHandler = require('express-async-handler')


//getGoals



const getGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get Goals" })
})
const setGoal = asyncHandler(async (req, res) => {
    console.log(req.body);
    if (!req.body.test) {

        res.status(400)
        throw Error('please send data')
    }
    res.status(200).json({ message: "set Goals" })
})

const updateGoals = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `update Goals ${req.params.id}` })

})
const deleteGoals = ((req, res) => {
    res.status(200).json({ message: `delete Goals ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoals,
    deleteGoals
}
