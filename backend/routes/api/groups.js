const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Group, User, Membership, GroupImage } = require("../../db/models");
const { validateLogin } = require("./session");
const { restoreUser } = require("../../utils/auth");
const groupimage = require("../../db/models/groupimage");
const group = require("../../db/models/group");
// const validateLogin = require("./session")

//GET ALL GROUPS ORGANIZED AND JOINED BY CURRENT USER
router.get("/current", restoreUser, async (req, res, next) => {
    const { user } = req;
    const groupArray = [];
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
                userId: userId,
            },
        });

        for (groupId of groupIds) {
            let id = groupId.groupId;
            let group = await Group.findByPk(id);
            groupArray.push(group);
        }

        // console.log('groupIdx', groupIds)

        // groupArray.push(groupsMem);

        res.json(groupArray);
    }
});

//GET GROUP DETAILS BY GROUP ID
router.get("/:groupId", async (req, res, next) => {
    const groupId = req.params.groupId;
    const groupArray = [];
    const group = await Group.findByPk(groupId, {
        include: [
            {
                model: GroupImage,
            },
            {
                model: User,
                as: "Organizer",
            },
        ],
    });
    if (!group) {
        res.status = 404;
        res.json({
            message: "Group couldn't be found",
            statusCode: 404,
        });
    }
    // const user = await User.findOne({
    //     attributes: ["id", "firstName", "lastName"],
    //     where: {
    //         id: group.organizerId,
    //     },
    // });
    res.json(group);
});

//EDIT A GROUP
router.put("/:groupId", restoreUser, async (req, res, next) => {
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
    if (group.organizerId !== userId) {
        throw new Error("not authorized");
    }
    const errors = {};

    if (name.length > 60) {
        errors.name = "Name must be 60 characters or less";
    }
    // console.log("\n")
    // console.log(errors)
    // console.log("\n")
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
        res.status = 400;
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

        // group.previewImage = group.previewImage.url
        // console.log('GROIUPGORUGOGJROA', group)
        result.push(group);
    }
    res.json(result);
});

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
        // console.log("\n")
        // console.log(errors)
        // console.log("\n")
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
            res.status = 400;
            res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: errors,
            });
        }
        // console.log(req.body)
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
        const resGroup = await Group.findByPk(newGroup.id, {
            include: [
                {
                    model: GroupImage,
                },
                {
                    model: User,
                    as: "Organizer",
                },
            ],
        });

        res.json(resGroup);
    }
});

//DELETE A GROUP
router.delete("/:groupId", async (req, res, next) => {
    const groupId = req.params.groupId;
    const group = await Group.findByPk(groupId);
    if (!group) {
        res.status = 404;
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
module.exports = router;
