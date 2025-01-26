// ......................ADD NEW ELECTION.....................
// POST : api/elections
// PROTECTED (Oly admin)
const addElection = (req, res, next) => {
  res.json("Add Election");
};

// ......................GET ALL ELECTIONs.....................
// GET : api/elections
// PROTECTED
const getElections = (req, res, next) => {
  res.json("Get Elections");
};

// ......................GET SINGLE ELECTION.....................
// GET : api/elections/:id
// PROTECTED
const getElection = (req, res, next) => {
  res.json("Get Single Election");
};

// ......................GET SINGLE ELECTION.....................
// GET : api/elections/:id/candidates
// PROTECTED
const getCandidateOfElection = (req, res, next) => {
  res.json("Get Candidates of Election");
};

// ......................GET VOTER of ELECTION.....................
// GET : api/elections/:id/voters
// PROTECTED
const getElectionVoters = (req, res, next) => {
  res.json("Get Election Voters");
};

// ......................UPDATE ELECTION.....................
// PATCH : api/elections/:id
// PROTECTED (only admin)
const updateElection = (req, res, next) => {
  res.json("Edit Election");
};

// ......................DELETE ELECTION.....................
// DELETE : api/elections/:id
// PROTECTED (only admin)
const removeElection = (req, res, next) => {
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
