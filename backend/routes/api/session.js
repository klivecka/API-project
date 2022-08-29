const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();



//SIGN IN ROUTE
router.post("/", async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        const err = new Error("Login failed");
        err.status = 401;
        err.title = "Login failed";
        err.errors = ["The provided credentials were invalid."];
        return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
        user,
    });
});
//SIGN OUT ROUTE
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  //RESTORE SESSION USER
  router.get(
    '/',
    restoreUser,
    (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({});
    }
  );



module.exports = router;
