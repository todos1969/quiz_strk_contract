import Quiz from "../models/Quiz.js";
import FormData from "form-data";
import axios from "axios";
import fs from "fs";

// get all quizzes for user home page
export const getAllQuiz = async (req, res) => {
  try {
    const allQuiz = await Quiz.find();

    res.status(200).json({ allQuiz });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// create ipfs for the image
const pinFileToIPFS = async (src, fileName) => {
  const formData = new FormData();

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const metadata = JSON.stringify({
    name: fileName,
  });
  formData.append("pinataMetadata", metadata);

  const options = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", options);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: process.env.JWT_PINATA,
        },
      }
    );
    return res?.data?.IpfsHash;
  } catch (error) {
    return error;
  }
};

// create ipfs for the NFT metadata
const pinJSON = async (data) => {
  var config = {
    method: "post",
    url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.JWT_PINATA,
    },
    data: data,
  };

  const res = await axios(config);

  return res.data;
};

// create the quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const ipfsHash = await pinFileToIPFS(req.file.path, title);

    const image = "https://gateway.pinata.cloud/ipfs/" + ipfsHash;

    const data = JSON.stringify({
      name: title,
      image: image,
      description: description,
    });

    const ipfsRes = await pinJSON(data);

    const ipfsJson = "https://gateway.pinata.cloud/ipfs/" + ipfsRes.IpfsHash;

    const reqUser = req.user;

    const newQuiz = new Quiz({
      userId: reqUser.id,
      title: title,
      description: description,
      questions: JSON.parse(questions),
      ipfsJson: ipfsJson,
    });

    const savedQuiz = await newQuiz.save();

    res.status(201).json(savedQuiz);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

// get the quizzes of a user
export const getMyQuiz = async (req, res) => {
  try {
    const reqUser = req.user;
    const quiz = await Quiz.find({ userId: reqUser.id });

    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// delete the user quiz
export const deleteMyQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Quiz.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Quiz successfully deleted !" });
    } else {
      res.status(500).json({ msg: "An error occured !" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// get quiz
export const getQuiz = async (req, res) => {
  try {
    const { id } = req.params;

    const quiz = await Quiz.findOne({ _id: id });

    res.status(200).json({ quiz });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
