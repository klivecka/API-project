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
    Attendance,
    EventImage,
} = require("../../db/models");
const { validateLogin } = require("./session");
const { restoreUser } = require("../../utils/auth");
const attendance = require("../../db/models/attendance");
const e = require("express");

//GET ALL EVENTS
router.get("/", async (req, res, next) => {
    const events = await Event.findAll({
        include: [
            {
                model: Group,
                attributes: ["id", "name", "city", "state"],
            },
            {
                model: Venue,
                attributes: ["id", "city", "state"],
            },
        ],
    });
    let resultObj = {};
    let result = [];
    for (let i = 0; i < events.length; i++) {
        let attCount = 0;
        let event = events[i].toJSON();
        let eventId = event.id;
        const attendRows = await Attendance.findAll({
            where: {
                eventId: eventId,
                status: "member",
            },
        });
        attCount = attendRows.length;
        event.numAttending = attCount;

        let eventImg = await EventImage.findOne({
            attributes: ["url"],
            where: {
                eventId: eventId,
                preview: "true",
            },
        });
        event.previewImage = eventImg.url;
        result.push(event);
    }
    resultObj.Events = result;
    res.json(resultObj);
});

//GET DETAILS OF AN EVENT SPECIFIED BY EVENT ID

router.get("/:eventId", async (req, res, next) => {
    const eventId = req.params.eventId;
    const eventDeets = await Event.scope("eventDetails").findOne({
        where: {
            id: eventId
        },
        include: [
            {
                model: Group,
                attributes: ["id", "name", "city", "state"],
            },
            {
                model: Venue,
                attributes: ["id", "city", "state"],
            },
            {
                model: EventImage,
                as: "EventImages",
                attributes: ["id", "url", "preview"],
            },
        ],
    });
    if (!eventDeets) {
        res.status(404);
        res.json({
            message: "Event couldn't be found",
            statusCode: 404,
        });
    }

    let resultObj = {};
    let result = [];

    let attCount = 0;
    let event = eventDeets.toJSON();
    const attendRows = await Attendance.findAll({
        where: {
            eventId: eventId,
            status: "member",
        },
    });
    attCount = attendRows.length;
    event.numAttending = attCount;
    result.push(event);

    resultObj.Events = result;
    res.json(resultObj);
});




module.exports = router;
