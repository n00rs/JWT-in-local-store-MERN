const mongoose = require('mongoose') 

const goalSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'user'

    },
    text: 
    {
        type: 'string',
        required:[true , 'please add a text ']
    }
},{
    timestamps: true                                                                                      //automatically creates an created and updated time fields
})


module.exports = mongoose.model('Goal', goalSchema)