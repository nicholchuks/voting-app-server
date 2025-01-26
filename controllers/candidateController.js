// ......................ADD CANDIDATE.....................
// POST : api/elections
// PROTECTED (Oly admin)
const addCandidate = (req, res, next) => {
  res.json("Add Candidate");
};

// ......................GET CANDIDATE.....................
// GET : api/elections/:id
// PROTECTED
const getCandidate = (req, res, next) => {
  res.json("Get candidate");
};

// ......................DELETE CANDIDATE.....................
// GET : api/elections/:id
// PROTECTED (Oly admin)
const removeCandidate = (req, res, next) => {
  res.json("Delete candidate");
};

// ......................VOTE.....................
// PARCH : api/elections/:id
// PROTECTED
const voteCandidate = (req, res, next) => {
  res.json("Vote candidate");
};

module.exports = { addCandidate, getCandidate, removeCandidate, voteCandidate };
