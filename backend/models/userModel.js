const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        required:[true, 'please add a name']
    },
    email:{
        type:'string',
        required:[true, 'please add an email'],
        unique:true
    },
    password:{
        type: "string",
        required:[true, 'please add a password']
    }
},{
    timestamps:true
})

module.exports =mongoose.model('user',userSchema)