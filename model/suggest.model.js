const mongoose = require("mongoose")

const SuggestWordSchema = new mongoose.Schema({
    kroosSuggestion: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    englishSuggestion: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    contactSuggestor: {
        type: String,
        trim: true,
        required: true
    },
    contactPlatform: {
        type: String,
        required: false
    }
}, {timestamps: true})

const Suggest = mongoose.model("Suggest", SuggestWordSchema)

module.exports = Suggest