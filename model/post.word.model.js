const mongoose = require("mongoose")

const PostWordSchema = new mongoose.Schema({
    kroos: {
        type: String,
        trim: true,
        unique: true
    }, 
    english: {
        type: String,
        trim: true,
        unique: true
    },
    meaning: {
        type: String,
        trim: true
    }
})

const PostWord = mongoose.model("PostWord", PostWordSchema)

module.exports = PostWord