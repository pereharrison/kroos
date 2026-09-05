const PostWord = require("../model/post.word.model");

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

module.exports = { AddWord, allWords };
