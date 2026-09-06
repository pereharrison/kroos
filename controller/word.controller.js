const PostWord = require("../model/post.word.model");
const Suggest = require("../model/suggest.model");

const AddWord = async (req, res) => {
  try {
    const { kroos, english, meaning } = req.body;
    if (!kroos || !english || !meaning) {
      return res.status(400).json({
        message: "All fields are required!",
      });
    }

    const checkForKroosWord = await PostWord.findOne({ kroos }).lean();
    if (checkForKroosWord) {
      return res.status(400).json({
        messsage: "word exists already",
      });
    }
    const createKroosWord = await PostWord.create({ kroos, english, meaning });

    if (!createKroosWord) {
      return res.status(400).json({
        message: "failed to create word",
      });
    }

    res.status(200).json({
      message: `(${kroos}) created successfully `,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const allWords = async (req, res) => {
  try {
    const getAllWords = await PostWord.find({});
    if (!getAllWords) {
      return res.status(404).json({
        message: "could not get all words",
      });
    }

    res.status(200).json({
      message: "successful",
      data: getAllWords,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const suggestWord = async (req, res) => {
  const { suggestion } = req.body;
  if (!suggestion) {
    return res.status(400).json({
      message: "Suggestion is required",
    });
  }

  const createSuggestion = await Suggest.create({ suggestion });
  if (!createSuggestion) {
    return res.status(400).json({
      message: "Could not create suggestion",
    });
  }

  res.status(200).json({
    message: "Suggestion created successfully!",
  });
};

const seeSuggestions = async (req, res) => {
  try {
    const allSuggestions = await Suggest.find({});
    if (!allSuggestions) {
      return res.status(400).json({
        message: "Could not get suggestions",
      });
    }
    res.status(200).json({
      message: "All suggestions",
      data: allSuggestions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = { AddWord, allWords, suggestWord, seeSuggestions };
