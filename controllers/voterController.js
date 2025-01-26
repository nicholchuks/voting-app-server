// ......................REGISTER NEW VOTER.....................
// POST : api/voters/register
// UNPROTECTED
const registerVoter = (req, res, next) => {
  res.json("Register Voter");
};

// ......................LOGIN VOTER.....................
// POST : api/voters/login
// UNPROTECTED
const loginVoter = (req, res, next) => {
  res.json("Login Voter");
};

// ......................GET VOTER.....................
// GET : api/voters/:id
// PROTECTED
const getVoter = (req, res, next) => {
  res.json("Get Voter");
};

module.exports = { registerVoter, loginVoter, getVoter };
