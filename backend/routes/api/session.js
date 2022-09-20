const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validateLogin = [
    check("credential")
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage("Email is required"),
    check("password")
        .exists({ checkFalsy: true })
        .withMessage("Password is required"),
    handleValidationErrors,
];

//LOG IN ROUTE
router.post("/", validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
        res.status(401);

        res.json({
            message: "Invalid credentials",
            statusCode: 401,
        });
    }

    const token = await setTokenCookie(res, user);
    userRes = user.toJSON();
    userRes.token = token;

    return res.json(userRes);
});
//SIGN OUT ROUTE
router.delete("/", (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "success" });
});

//RESTORE SESSION USER
router.get("/", [restoreUser], (req, res) => {
    // console.log('THIS IS RESTORE USER RUNNING')
    const { user } = req;
    if (user) {
        // console.log('THIS IS THE RESPONSE WITH THERE IS A USER', res)
        return res.json(user.toSafeObject());
    } else return res.json({});
});

//VALIDATION FOR THE REQUEST BODY

module.exports = router;
// module.exports = validateLogin;
// module.exports =  validateLogin
