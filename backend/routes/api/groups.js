const express = require("express");
const router = express.Router();
const { requireAuth, restoreUser, validGroup } = require("../../utils/auth");
const { Op } = require("sequelize");
const {
    Group,
    User,
    Membership,
    GroupImage,
    Venue,
    Event,
    EventImage,
    Attendance,
} = require("../../db/models");
const { validateLogin } = require("./session");

//GET ALL EVENTS SPECIFIED BY GROUP ID **********EVENTS
router.get("/:groupId/events", async (req, res, next) => {
    const groupId = req.params.groupId;
    const groupTest = await Group.findByPk(groupId);
    if (!groupTest) {
        res.status(404);
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    }

    const events = await Event.findAll({
        where: {
            groupId: groupId,
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
        ],
    });

    let resultObj = {};
    let result = [];

    //loop through the events and add number of attendees and the preview images
    for (let i = 0; i < events.length; i++) {
        //get all attendees and count the number of rows
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

        //find imageUrl and add to event
        let eventImg = await EventImage.findOne({
            attributes: ["url"],
            where: {
                eventId: eventId,
                preview: true,
            },
        });
        if (!eventImg) {
            event.previewImage = null;
        } else event.previewImage = eventImg.url;
        result.push(event);
    }
    resultObj.Events = result;
    res.json(resultObj);
});

//CREATE AN EVENT FOR A GROUP BY GROUP ID ************** EVENTS
router.post(
    "/:groupId/events",
    [restoreUser, requireAuth],
    async (req, res, next) => {
        const groupId = req.params.groupId;
        const { user } = req;
        const userId = user.toSafeObject().id;
        const {
            venueId,
            name,
            type,
            capacity,
            price,
            description,
            startDate,
            endDate,
        } = req.body;
        const groupCheck = await Group.findByPk(groupId);
        if (!groupCheck) {
            res.status(404),
                res.json({
                    message: "Group couldn't be found",
                    statusCode: 404,
                });
        }
        const errors = {};
        const venueCheck = await Venue.findByPk(venueId);
        if (!venueCheck) {
            errors.venueId = "Venue does not exist";
        }
        if (name.length < 5) {
            errors.name = "Name must be at least 5 characters";
        }
        if (type !== "Online" && type !== "In person") {
            errors.type = "Type must be Online or In person";
        }
        if (!Number.isInteger(capacity)) {
            errors.capacity = "Capacity must be an integer";
        }
        let priceString = price.toString();
        let priceSplit = priceString.split(".");
        if (!Number.isInteger(price * 100)) {
            errors.price = "Price is invalid";
        }
        if (!description) {
            errors.description = "Description is required";
        }
        let date = new Date();
        let startDateConvert = new Date(startDate);
        if (startDateConvert < date) {
            errors.startDate = "Start date must be in the future";
        }
        if (endDate < startDate) {
            errors.endDate = "End date is less than start date";
        }
        if (Object.keys(errors).length) {
            res.status(400);
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: errors,
            });
        }

        const newEvent = Event.build({
            groupId: groupId,
            venueId: venueId,
            name: name,
            type: type,
            capacity: capacity,
            price: price,
            description: description,
            startDate: startDate,
            endDate: endDate,
        });
        await newEvent.save();
        const eventId = newEvent.id;

        // const attendee = Attendance.build({
        //     eventId: eventId,
        //     userId: userId,
        //     status: "member"
        // })

        // await attendee.save()

        eventRes = await Event.scope("eventDetails").findByPk(eventId);
        res.json(eventRes);
    }
);

//GET ALL GROUPS ORGANIZED AND JOINED BY CURRENT USER
router.get("/current", [restoreUser, requireAuth], async (req, res, next) => {
    const { user } = req;
    const groupObj = {};
    const groupArray = [];
    const result = [];
    if (user) {
        const userId = user.toSafeObject().id;
        const groupsOrg = await Group.findAll({
            where: {
                organizerId: userId,
            },
        });
        groupArray.push(...groupsOrg);

        const groupIds = await Membership.findAll({
            attributes: ["groupId"],
            where: {
                userId: {
                    [Op.eq]: [userId],
                },
            },
        });

        for (groupId of groupIds) {
            let id = groupId.groupId;
            let group = await Group.findOne({
                where: {
                    id: id,
                    organizerId: {
                        [Op.ne]: [userId],
                    },
                },
            });
            if (group) groupArray.push(group);
        }
        for (let i = 0; i < groupArray.length; i++) {
            let ele = groupArray[i].toJSON();
            let imageUrl = await GroupImage.findOne({
                attributes: ["url"],
                where: {
                    groupId: ele.id,
                    preview: true,
                },
            });
            if (imageUrl) {
                ele.previewImage = imageUrl.url;
            }
            if (!imageUrl) {
                ele.previewImage = "no image";
            }
            result.push(ele);
        }

        groupObj.Groups = result;
        res.json(groupObj);
    }
});

//GET GROUP DETAILS BY GROUP ID
router.get("/:groupId", async (req, res, next) => {
    const groupId = req.params.groupId;
    const groupArray = [];
    const group = await Group.findOne({
        where: {
            id: groupId,
        },
        include: [
            {
                model: GroupImage,
            },
            {
                model: Venue,
            },
        ],
    });
    if (!group) {
        res.status(404);
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    }
    const userId = group.organizerId
    const user = await User.findOne({
        attributes: ["id", "firstName", "lastName"],
        where: {
            id: userId
        }
    })
    const groupRes = group.toJSON()
    groupRes.Organizer = user




    res.json(groupRes);
});

//GET ALL VENUES FOR A GROUP BY GROUP ID ************** VENUES
router.get("/:groupId/venues", async (req, res, next) => {
    const resObj = {};
    const groupId = req.params.groupId;
    const venues = await Venue.findAll({
        where: {
            groupId: groupId,
        },
    });
    if (!venues) {
        res.status(404);
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    }
    resObj.Venues = venues;
    res.json(resObj);
});

//CREATE A NEW VENUE FOR A GROUP BASED ON A GROUP ID ************** VENUES
router.post(
    "/:groupId/venues",
    [restoreUser, requireAuth],
    async (req, res, next) => {
        const groupId = req.params.groupId;
        const { address, city, state, lat, lng } = req.body;
        const groupCheck = await Group.findByPk(groupId);
        if (!groupCheck) {
            res.status(404),
                res.json({
                    message: "Group couldn't be found",
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
        const newVenue = Venue.build({
            groupId: groupId,
            address: address,
            city: city,
            state: state,
            lat: lat,
            lng: lng,
        });

        await newVenue.save();
        const venueRes = await Venue.findOne({
            where: {
                groupId: groupId,
                address: address,
                city: city,
            },
        });
        res.json(venueRes);
    }
);

//EDIT A GROUP
router.put("/:groupId", [restoreUser, requireAuth], async (req, res, next) => {
    const { user } = req;
    const userId = user.toSafeObject().id;

    const { name, about, type, private, city, state } = req.body;
    const groupId = req.params.groupId;
    const group = await Group.scope("editGroup").findByPk(groupId);
    if (!group) {
        res.status(404);
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    }
    //below is authorization
    if (group.organizerId !== userId) {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403,
        });
    }
    const errors = {};

    if (name.length > 60) {
        errors.name = "Name must be 60 characters or less";
    }

    if (about.length < 50) {
        errors.about = "About must be 50 characters or more";
    }
    if (type !== "Online" && type !== "In person") {
        errors.type = "Type must be 'Online' or 'In person'";
    }
    if (private !== true && private !== false) {
        errors.private = "Private must be a boolean";
    }
    if (!city) {
        errors.city = "City is required";
    }
    if (!state) {
        errors.state = "State is required";
    }
    if (Object.keys(errors).length) {
        res.status(404);
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: errors,
        });
    }

    group.set({
        name: name,
        about: about,
        type: type,
        private: private,
        city: city,
        state: state,
    });
    await group.save();
    res.json(group);
});

//GET ALL GROUPS
router.get("/", async (req, res, next) => {
    let resultObj = {};
    let result = [];
    let groups = await Group.findAll();
    for (let i = 0; i < groups.length; i++) {
        let group = groups[i].toJSON();
        let imageUrl = await GroupImage.findOne({
            attributes: ["url"],
            where: {
                groupId: group.id,
                preview: true,
            },
        });
        if (imageUrl) {
            group.previewImage = imageUrl.url;
        }
        if (!imageUrl) {
            group.previewImage = "no image";
        }

        result.push(group);
    }
    resultObj.Groups = result;
    res.json(resultObj);
});

//ADD AN IMAGE TO A GROUP
router.post(
    "/:groupId/images",
    [restoreUser, requireAuth],
    async (req, res, next) => {
        const { user } = req;
        const userId = user.toSafeObject().id;
        const groupId = req.params.groupId;
        const { url, preview } = req.body;
        const groupData = await Group.findByPk(groupId);
        if (!groupData) {
            res.status(404);
            res.json({
                message: "Group couldn't be found",
                statusCode: 404,
            });
        }
        if (groupData.organizerId !== userId) {
            res.status(403);
            res.json({
                message: "Forbidden",
                statusCode: 403,
            });
        }

        const newImage = GroupImage.build({
            groupId: groupId,
            url: url,
            preview: preview,
        });

        await newImage.save();
        resObj = {};
        (resObj.id = newImage.id),
            (resObj.url = newImage.url),
            (resObj.preview = newImage.preview);
        res.json({
            ...resObj,
        });
    }
);

//CREATE A GROUP
router.post("/", [restoreUser, requireAuth], async (req, res, next) => {
    const { user } = req;

    const { name, about, type, private, city, state } = req.body;
    if (user) {
        const errors = {};
        const userId = user.toSafeObject().id;

        if (name.length > 60) {
            errors.name = "Name must be 60 characters or less";
        }
        if (about.length < 50) {
            errors.about = "About must be 50 characters or more";
        }
        if (type !== "Online" && type !== "In person") {
            errors.type = "Type must be 'Online' or 'In person'";
        }
        if (private !== true && private !== false) {
            errors.private = "Private must be a boolean";
        }
        if (!city) {
            errors.city = "City is required";
        }
        if (!state) {
            errors.state = "State is required";
        }
        if (Object.keys(errors).length) {
            res.status(400);
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: errors,
            });
        }

        const newGroup = Group.build({
            organizerId: userId,
            name: name,
            about: about,
            type: type,
            private: private,
            city: city,
            state: state,
        });

        await newGroup.save();
        const resGroup = await Group.scope("editGroup").findByPk(newGroup.id);

       const coHost = await Membership.build({
            userId: userId,
            groupId: newGroup.id,
            status: "co-host"
        })

        await coHost.save()
        
        res.json(resGroup);
    }
});

//DELETE A GROUP
router.delete("/:groupId", async (req, res, next) => {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status(404);
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    }
    await group.destroy();
    res.json({
        message: "Successfully deleted",
        statusCode: 200,
    });
});


//GET ALL MEMBERSHIPS OF A GROUP BY A GROUP ID *****************MEMBERSHIPS
router.get(
    "/:groupId/members",
    [restoreUser, requireAuth, validGroup],
    async (req, res, next) => {
        const groupId = req.params.groupId;
        const { user } = req;
        const userId = user.toSafeObject().id;

        const groupUsers = await Group.findOne({
            where: {
                id: groupId,
            },
            include: {
                model: User,
                attributes: ["id", "firstName", "lastName"],
            },
        });
        const userCoHost = await Membership.findOne({
            attributes: ["status"],
            where: {
                userId: userId,
                groupId: groupId,
            },
        });

        const result = {};
        const newArray = [];
        membersArray = groupUsers.Users;
        // delete result.Members
        for (member of membersArray) {
            let newObj = {};
            let { id, firstName, lastName } = member;
            let status = member.Membership.status;
            if (
                userId === groupUsers.organizerId ||
                userCoHost.status === "co-host"
            ) {
                newObj = { id, firstName, lastName };
                newObj.Membership = {};
                newObj.Membership.status = status;
                newArray.push(newObj);
            } else {
                newObj = { id, firstName, lastName };
                newObj.Membership = {};
                newObj.Membership.status = status;
                if (status === "co-host" || status === "member") {
                    newArray.push(newObj);
                }
            }
        }
        result.Members = newArray;
        res.json(result);
    }
);

//CREATE NEW MEMBERSHIP REQUEST  *****************MEMBERSHIPS
router.post(
    "/:groupId/membership",
    [restoreUser, requireAuth, validGroup],
    async (req, res, next) => {
        const { user } = req;
        const { memberId, status } = req.body;
        const userId = user.toSafeObject().id;
        const groupId = req.params.groupId;

        const memberCheck = await Membership.findOne({
            where: {
                userId: memberId,
                groupId: groupId,
            },
        });

        if (memberCheck) {
            if (memberCheck.status === "pending") {
                res.status(400),
                    res.json({
                        message: "Membership has already been requested",
                        statusCode: 400,
                    });
            }
            if (
                memberCheck.status === "member" ||
                memberCheck.status === "co-host"
            ) {
                res.status(400),
                    res.json({
                        message: "User is already a member of the group",
                        statusCode: 400,
                    });
            }
        }

        //build the new member
        const newMember = Membership.build({
            groupId: groupId,
            userId: memberId,
            status: "pending",
        });

        await newMember.save();
        const memberRes = await Membership.findOne({
            where: {
                userId: memberId,
                groupId: groupId,
            },
        });
        const resObj = {};
        resObj.id = memberRes.id
        resObj.groupId = memberRes.groupId;
        resObj.memberId = memberRes.userId;
        resObj.status = memberRes.status;

        res.json(resObj);
    }
);

//CHANGE MEMBERSHIP STATUS  *****************MEMBERSHIPS
router.put(
    "/:groupId/membership",
    [restoreUser, requireAuth, validGroup],
    async (req, res, next) => {
        const group = res.group;
        const groupId = req.params.groupId;
        const { user } = req;
        const userId = user.toSafeObject().id;
        const { memberId, status } = req.body;

        const groupMembers = await Membership.findAll({
            where: {
                groupId: groupId,
            },
        });
        //check if requester is cohost
        let isCoHost = false;
        for (member of groupMembers) {
            if (userId === member.userId && member.status === "co-host") {
                isCoHost = true;
            }
        }

        //check if the user exists
        const userCheck = await User.findByPk(memberId);
        if (!userCheck) {
            res.status(400);
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    memberId: "User couldn't be found",
                },
            });
        }

        //find the membership to be chagned
        const changeMem = await Membership.findOne({
            where: {
                userId: memberId,
                groupId: groupId,
            },
        });
        //no membership found error
        if (!changeMem) {
            res.status(404);
            res.json({
                message:
                    "Membership between the user and the group does not exits",
                statusCode: 404,
            });
        }
        //if the request is to change to to member
        if (status === "member") {
            if (userId === group.organizerId || isCoHost) {
                changeMem.set({
                    status: status,
                });
                await changeMem.save()
                const id = changeMem.id;
                resObj = { id, groupId, memberId, status };
                res.json(resObj);
            } else {
                res.status(404);
                res.json({ message: "insufficient permissions", status: 404 });
            }
        }

        //if the request is to change to cohost
        if (status === "co-host") {
            if (userId === group.organizerId) {
                changeMem.set({
                    status: status,
                });
                const id = changeMem.id;
                resObj = { id, groupId, memberId, status };
                res.json(resObj);
            } else {
                res.status(404);
                res.json({ message: "insufficient permissions", status: 404 });
            }
        }
        //if the request is to change to pending error
        if (status === "pending") {
            res.status(400);
            res.json({
                message: "Validations Error",
                statusCode: 400,
                errors: {
                    status: "Cannot change a membership status to pending",
                },
            });
        }
    }
);

//DELETE MEMBERSHIP FROM MEMBERID AND GROUP ID ****************MEMBERSHIPS
router.delete(
    "/:groupId/membership",
    [restoreUser, requireAuth, validGroup],
    async (req, res, next) => {
        const group = res.group;
        const groupId = req.params.groupId;
        const { user } = req;
        const userId = user.toSafeObject().id;
        const { memberId } = req.body;

        //check if the user exists
        const userCheck = await User.findByPk(memberId);
        if (!userCheck) {
            res.status(400);
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    memberId: "User couldn't be found",
                },
            });
        }

        const member = await Membership.findOne({
            where: {
                userId: memberId,
                groupId: groupId,
            },
        });

        //no membership found error
        if (!member) {
            res.status(404);
            res.json({
                message: "Membership does not exist for this User",
                statusCode: 404,
            });
        }

        //check if user is co-host
        const groupMembers = await Membership.findAll({
            where: {
                groupId: groupId,
            },
        });

        let isCoHost = false;
        for (members of groupMembers) {
            if (userId === member.userId && member.status === "co-host") {
                isCoHost = true;
            }
        }

        //check if user is the member being deleted
        let isMember = false;
        if (memberId === userId) {
            isMember = true;
        }

        //if the user isnt the member or a cohost error
        if (!isCoHost && !isMember) {
            res.status(404);
            res.json({ message: "insufficient permissions", status: 404 });
        }

        await Membership.destroy({
            where: {
                userId: memberId,
                groupId: groupId,
            },
        });

        res.json({
            message: "Successfully deleted membership from group",
        });
    }
);











module.exports = router;