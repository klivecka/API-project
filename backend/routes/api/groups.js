const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Group, User } = require("../../db/models");
const validateLogin = require("./session")
const { restoreUser } = require("../../utils/auth")
// const validateLogin = require("./session")

//GET ALL GROUPS ORGANIZED BY CURRENT USER
router.get('/current', restoreUser, async (req, res, next) => {
    const { user } = req;
    if (user) {
        const userId = user.toSafeObject().id;
        const groups = await Group.findAll({
            where: {
                organizerId: userId
            }
        })
        res.json(groups)
    }
})

router.get("/", async (req, res, next) => {
    const groups = await Group.findAll({});
    res.json(groups);
});

router.post('/', restoreUser, async (req, res, next) => {
    const { user } = req;
    const { name, about, type, private, city, state } = req.body
    if (user) {
        const userId = user.toSafeObject().id
        // console.log(req.body)
        const newGroup = Group.build({
            organizerId: userId,
            name: name,
            about: about,
            type: type,
            private: private,
            city: city,
            state: state
        })
        await newGroup.save();
        res.json(newGroup)
    }
})

module.exports = router;
