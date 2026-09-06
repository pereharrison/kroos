const {
  AddWord,
  allWords,
  suggestWord,
  seeSuggestions,
  seeSpecificWord,
  seeWordDetails,
} = require("../controller/word.controller");
const express = require("express");

const wordRoute = express.Router();

wordRoute.post("/add-word", AddWord);
wordRoute.get("/all-words", allWords);
wordRoute.post("/suggest-word", suggestWord);
wordRoute.get("/all-suggested-words", seeSuggestions);
wordRoute.get("/:english", seeSpecificWord);
wordRoute.get("/details/:id", seeWordDetails);

module.exports = wordRoute;
