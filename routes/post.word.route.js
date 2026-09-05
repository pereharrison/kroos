const {AddWord, allWords} = require("../controller/word.controller")
const express = require("express")

const wordRoute = express.Router()

wordRoute.post("/add-word", AddWord)
wordRoute.get("/all-words", allWords)

module.exports = wordRoute