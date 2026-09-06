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
  const { kroosSuggestion, englishSuggestion } = req.body;
  if (!kroosSuggestion || englishSuggestion) {
    return res.status(400).json({
      message: "Suggestion fields are required",
    });
  }

  const checkSuggestion = await Suggest.findOne({englishSuggestion})
  if(checkSuggestion){
    return res.status(400).json({
      message: "English word has been suggested already!"
    }) 
  }

  const createSuggestion = await Suggest.create({ kroosSuggestion, englishSuggestion });
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

const seeSpecificWord = async (req, res) => {
  try {
    const { english } = req.params;
    if (!english) {
      return res.status(400).json({
        message: "English word is required!",
      });
    }

    const findWord = await PostWord.findOne({ english });
    if (!findWord) {
      return res.status(404).json({
        message: "could not find word",
      });
    }

    res.status(200).json({
      message: "successful",
      data: findWord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || error.response,
    });
  }
};

const seeWordDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        message: "id is required",
      });
    }

    const word = await PostWord.findById(id);

    if (!word) {
      return res.status(404).json({
        message: "Word not found",
      });
    }

    res.status(200).json({
      message: "Word found",
      data: word,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
module.exports = {
  AddWord,
  allWords,
  suggestWord,
  seeSuggestions,
  seeSpecificWord,
  seeWordDetails
};
