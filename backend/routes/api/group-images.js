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

//DELETE AN IMAGE FROM A GROUP

router.delete(
    "/:groupImageId",
    [restoreUser, requireAuth],
    async (req, res, next) => {
        const { user } = req;
        const userId = user.toSafeObject().id;
        const groupImageId = req.params.groupImageId

        const image = await GroupImage.scope("delete").findByPk(groupImageId)
        const groupId = image.groupId
        const group = await Group.findByPk(groupId)

        //check if user is co-host
        const groupMembers = await Membership.findAll({
            where: {
                groupId: groupId,
            },
        });

        let isCoHost = false;
        for (member of groupMembers) {
            if (userId === member.userId && member.status === "co-host") {
                isCoHost = true;
            }
        }

        if (userId !== group.organizerId && !isCoHost) {
            res.status(403);
            res.json({
                message:
                    "Forbidden. User must be organizer or co-host of the group",
                statusCode: 403,
            });
        }

        

        await image.destroy()

        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
          })
    }
);

module.exports = router;
