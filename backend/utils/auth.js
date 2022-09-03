const jwt = require("jsonwebtoken");
const { jwtConfig } = require("../config");
const { User, Group } = require("../db/models");

const { secret, expiresIn } = jwtConfig;

const setTokenCookie = (res, user) => {
    const token = jwt.sign({ data: user.toSafeObject() }, secret, {
        expiresIn: parseInt(expiresIn),
    });

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax",
    });

    return token;
};

const restoreUser = (req, res, next) => {
    const { token } = req.cookies;
    req.user = null;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope("currentUser").findByPk(id);
        } catch (e) {
            res.clearCookie("token");
            return next();
        }

        if (!req.user) res.clearCookie("token");

        return next();
    });
};

const requireAuth = function (req, _res, next) {
    if (req.user) return next();

    const err = new Error("Authentication Required");
    err.title = "Authentication Required";
    err.errors = ["Authentication Required"];
    err.status = 401;
    return next(err);
};
const validGroup = async function (req, res, next) {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404);
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    } else {
        res.group = group
        return next();
    }
};

module.exports = { setTokenCookie, restoreUser, requireAuth, validGroup };
