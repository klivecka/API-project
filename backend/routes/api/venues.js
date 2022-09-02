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
} = require("../../db/models");
const { validateLogin } = require("./session");
const { restoreUser } = require("../../utils/auth");

router.put("/:venueId", restoreUser, async (req, res, next) => {
    const { user } = req;
    const userId = user.toSafeObject().id;
    const venueId = req.params.venueId;
    const { address, city, state, lat, lng } = req.body;

    const venue = await Venue.findByPk(venueId);

    if (!venue) {
        res.status(404);
        res.json({
            message: "Venue couldn't be found",
            statusCode: 404,
        });
    }
    //BODY VALIDATION ERRORS
    const errors = {};
    if (!address) {
        errors.address = "Street address is required";
    }
    if (!city) {
        errors.city = "City is required";
    }
    if (!state) {
        errors.state = "State is required";
    }
    const latAbs = Math.abs(lat);
    const latString = latAbs.toString();
    if (latAbs > 90 || latString[2] !== "." || latString.length !== 10) {
        errors.lat = "Latitude is not valid";
    }
    const lngAbs = Math.abs(lng);
    const lngString = lngAbs.toString();
    const lngStringSplit = lngString.split(".");

    if (
        lng > 180 ||
        lngStringSplit[0].length < 2 ||
        lngStringSplit[0].length > 3 ||
        lngStringSplit[1].length !== 7
    ) {
        errors.lat = "Longitude is not valid";
    }
    if (Object.keys(errors).length) {
        res.status(404);
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: errors,
        });
    }
    venue.set({
        address: address,
        city: city,
        state: state,
        lat: lat,
        lng: lng,
    });
    await venue.save();
    const newVenue = await Venue.findByPk(venueId)
    res.json(newVenue);
});

module.exports = router;
