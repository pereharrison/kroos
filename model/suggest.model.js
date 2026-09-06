const mongoose = require("mongoose")

const SuggestWordSchema = new mongoose.Schema({
    suggestion: {
        type: String,
        trim: true,
        unique: true
    }
})

const Suggest = mongoose.model("Suggest", SuggestWordSchema)

module.exports = Suggest