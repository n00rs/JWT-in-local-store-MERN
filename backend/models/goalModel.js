const mongoose = require('mongoose') 

const goalSchema = mongoose.Schema({
    text: 
    {
        type: 'string',
        required:[true , 'please add a text ']
    }
},{
    timestamps: true                                                                                      //automatically creates an created and updated time fields
})


module.exports = mongoose.model('Goal', goalSchema)