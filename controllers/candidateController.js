const { v4: uuid } = require("uuid");
const HttpError = require("../models/ErrorModel");
const cloudinary = require("../utils/cloudinary");
const path = require("path");
const mongoose = require("mongoose");

const ElectionModel = require("../models/electionModel");
const CandidateModel = require("../models/candidateModel");

require("dotenv").config();

// ......................ADD CANDIDATE.....................
// POST : api/elections
// PROTECTED (Oly admin)
const addCandidate = async (req, res, next) => {
  try {
    //Only admin can add election
    if (!req.user.isAdmin) {
      return next(new HttpError("Only an admin can perform this action.", 403));
    }

    const { fullName, motto, currentElection } = req.body;
    if (!fullName || !motto) {
      return next(new HttpError("Fill in all fields.", 422));
    }

    if (!req.files.image) {
      return next(new HttpError("Choose an image.", 422));
    }

    const { image } = req.files;
    //  check file size
    if (image.size > 1000000) {
      return next(new HttpError("Image shouldn't be more than 1mb.", 422));
    }

    // Rename the image
    let fileName = image.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

    //  upload file to the uploads folder in project
    image.mv(path.join(__dirname, "..", "uploads", fileName), async (err) => {
      if (err) {
        return next(HttpError(err));
      }

      //  store image on cloudinary
      const result = await cloudinary.uploader.upload(
        path.join(__dirname, "..", "uploads", fileName),
        { resource_type: "image" }
      );
      if (!result.secure_url) {
        return next(new HttpError("Couldn't upload image to cloudinary", 422));
      }

      //Save candidate to db
      const newCandidate = await CandidateModel.create({
        fullName,
        motto,
        image: result.secure_url,
        election: currentElection,
      });

      // Get election and push path candidate
      let election = await ElectionModel.findById(currentElection);

      const sess = await mongoose.startSession();
      sess.startTransaction();
      await newCandidate.save({ session: sess });
      election.candidates.push(newCandidate);
      await election.save({ session: sess });
      await sess.commitTransaction();

      res.status(201).json("Candidate added successfully.");
    });
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ......................GET CANDIDATE.....................
// GET : api/elections/:id
// PROTECTED
const getCandidate = async (req, res, next) => {
  res.json("Get candidate");
};

// ......................DELETE CANDIDATE.....................
// GET : api/elections/:id
// PROTECTED (Oly admin)
const removeCandidate = async (req, res, next) => {
  res.json("Delete candidate");
};

// ......................VOTE.....................
// PARCH : api/elections/:id
// PROTECTED
const voteCandidate = async (req, res, next) => {
  res.json("Vote candidate");
};

module.exports = { addCandidate, getCandidate, removeCandidate, voteCandidate };
