const router = require("express").Router();

// ***********************************************//
// Get current user
// **********************************************//
router.get("/api/user/me", async (req, res) => res.json(req.user));

// ***********************************************//
// Update a user
// **********************************************//
router.patch("/api/users/me", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});
// ***********************************************//
// Delete current user
// ***********************************************//
router.delete("/api/users/me", async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.remove();
    res.clearCookie("jwt");
    res.json({ message: "Account deleted." });
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// ***********************************************//
// Logout current user
// ***********************************************//
router.post("/api/users/logout", async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "logged out!" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// ***********************************************//
// Logout current user on all devices (clear all tokens)
// ***********************************************//
router.post("/api/users/logoutAll", async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "all devices logged out" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// ***********************************************//
// Update a password
// ***********************************************//
router.put("/api/password", async (req, res) => {
  try {
    req.user.password = req.body.password;
    await req.user.save();
    res.clearCookie("jwt");
    res.json({ message: "password updated successfully" });
  } catch (e) {
    res.json({ error: e.toString() });
  }
});
module.exports = router;
