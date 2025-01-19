const { Router } = require("express");

const router = Router();

router.post('/voters/register', registerVoter)

module.exports = router;
