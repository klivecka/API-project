const express = require("express");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage("Please provide a username with at least 4 characters."),
    check("username")
        .not()
        .isEmail()
        .withMessage("Username cannot be an email."),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    handleValidationErrors,
];

router.post("/", validateSignup, async (req, res) => {
    const { firstName, lastName, email, username, password } = req.body;
    const userCheck = await User.findOne({
      where: {
        email: email
      }
    })


    
    if (userCheck) {
      res.status(403)
      res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }
    const user = await User.signup({
        firstName,
        lastName,
        username,
        email,
        password,
    });
    const token = await setTokenCookie(res, user);

    const userRes = await User.scope("currentUser").findOne({
        where: {
            email: email,
        },
    });
    const userObj = userRes.toJSON();
    userObj.token = token

    // const userObj = userRes.userRes
    console.log("\n");
    console.log(userObj);
    console.log("\n");
    return res.json(userObj);
});

module.exports = router;
