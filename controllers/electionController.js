const { v4: uuid } = require("uuid");
const HttpError = require("../models/ErrorModel");
const cloudinary = require("../utils/cloudinary");
const path = require("path");

const ElectionModel = require("../models/electionModel");
require("dotenv").config();

// ......................ADD NEW ELECTION.....................
// POST : api/elections
// PROTECTED (Oly admin)
const addElection = async (req, res, next) => {
  try {
    //Only admin can add election
    //   if(!req.user.isAdmin) {
    //    return next(new HttpError("Only an admin can perform this action.", 403))
    //  }

    const { title, description } = req.body;
    if (!title || !description) {
      return next(new HttpError("Fill all fields.", 422));
    }

    if (!req.files.thumbnail) {
      return next(new HttpError("Choose a thumbnail.", 422));
    }

    const { thumbnail } = req.files;
    // image should be less tham 1mb
    if (thumbnail.size > 1000000) {
      return next(new HttpError("File size too big. Should be less than 1mb"));
    }

    // Rename the image
    let fileName = thumbnail.name;
    fileName = fileName.split(".");
    fileName = fileName[0] + uuid() + "." + fileName[fileName.length - 1];

    // Upload file to upload folder
    await thumbnail.mv(
      path.join(__dirname, "..", "uploads", fileName),
      async (err) => {
        if (err) {
          return next(HttpError(err));
        }

        //  store image on cloudinary
        const result = await cloudinary.uploader.upload(
          path.join(__dirname, "..", "uploads", fileName),
          { resource_type: "image" }
        );
        if (!result.secure_url) {
          return next(
            new HttpError("Couldn't upload image to cloudinary", 422)
          );
        }

        //Save election to db
        const newElection = await ElectionModel.create({
          title,
          description,
          thumbnail: result.secure_url,
        });
        res.json(newElection);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ......................GET ALL ELECTIONs.....................
// GET : api/elections
// PROTECTED
const getElections = async (req, res, next) => {
  try {
    const elections = await ElectionModel.find();
    
    res.status(200).json(elections);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ......................GET SINGLE ELECTION.....................
// GET : api/elections/:id
// PROTECTED
const getElection = async (req, res, next) => {
  res.json("Get Single Election");
};

// ......................GET SINGLE ELECTION.....................
// GET : api/elections/:id/candidates
// PROTECTED
const getCandidateOfElection = async (req, res, next) => {
  res.json("Get Candidates of Election");
};

// ......................GET VOTER of ELECTION.....................
// GET : api/elections/:id/voters
// PROTECTED
const getElectionVoters = async (req, res, next) => {
  res.json("Get Election Voters");
};

// ......................UPDATE ELECTION.....................
// PATCH : api/elections/:id
// PROTECTED (only admin)
const updateElection = async (req, res, next) => {
  res.json("Edit Election");
};

// ......................DELETE ELECTION.....................
// DELETE : api/elections/:id
// PROTECTED (only admin)
const removeElection = async (req, res, next) => {
  res.json("Delete Election");
};

module.exports = {
  getElections,
  getElection,
  updateElection,
  removeElection,
  getCandidateOfElection,
  getElectionVoters,
  addElection,
};
