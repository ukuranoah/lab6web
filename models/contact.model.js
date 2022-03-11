const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ContactSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    phoneType:{
        type: String,
        required: true
    }
})
mongoose.model('contact', ContactSchema)