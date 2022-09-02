const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Op } = require("sequelize");
const {
    Group,
    User,
    Membership,
    GroupImage,
    Venue,
    Event,
} = require("../../db/models");
const { validateLogin } = require("./session");
const { restoreUser } = require("../../utils/auth");

router.get("/", async (req, res, next) => {
    const events = await Event.findAll({
        include: [
            {
                model: Group,
                attributes: ["id", "name", "city", "state"]
            },
            {
                model: Venue,
                attributes: ["id", "city", "state"]
            },
        ],
    });

    

    let eventObj = events.toJSON()

    res.json(events)
});

module.exports = router;
