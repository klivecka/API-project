const { validationResult } = require("express-validator");
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        const errorsArray = validationErrors.array();
        const errors = {};
        // .map((error) => `${error.param} : ${error.msg}`);
        for (error of errorsArray) {
            if (error.param === "credential") {
                errors.email = error.msg;
            } else errors[error.param] = error.msg;
        }

        const err = {};
        err.message = "Validation error";
        err.statusCode = 400;
        err.errors = errors;
        res.status(400);
        res.json(err);
    }
    next();
};

module.exports = {
    handleValidationErrors,
};

// const { body, validationResult } = require('express-validator');

// app.post(
//   '/user',
//   // username must be an email
//   body('username').isEmail(),
//   // password must be at least 5 chars long
//   body('password').isLength({ min: 5 }),
//   (req, res) => {
//     // Finds the validation errors in this request and wraps them in an object with handy functions
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     User.create({
//       username: req.body.username,
//       password: req.body.password,
//     }).then(user => res.json(user));
//   },
// );
