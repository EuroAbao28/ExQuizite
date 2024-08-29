const {
  signUp,
  login,
  getCurrentUser,
  updateUser,
  getAllUser,
  addDummyUser,
  getMyRank,
} = require("../controllers/userController");
const authenticateToken = require("../middleware/auth");

const router = require("express").Router();

router.get("/", authenticateToken, getCurrentUser);
router.get("/getAllUser", authenticateToken, getAllUser);
router.get("/getMyRank/:id", authenticateToken, getMyRank);

router.patch("/:id", authenticateToken, updateUser);

router.post("/signup", signUp);
router.post("/login", login);

router.post("/addDummyUser", addDummyUser);

module.exports = router;
