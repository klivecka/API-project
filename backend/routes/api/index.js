const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const groupsRouter = require("./groups.js");
const venuesRouter = require("./venues.js");
const eventsRouter = require("./events.js");
const groupImageRouter = require("./group-images.js");
const eventImageRouter = require("./event-images.js");
const { requireAuth } = require("../../utils/auth");

router.get("/test", requireAuth, (req, res) => {
    res.json({ message: "success" });
});

//all routers come through this file

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/groups", groupsRouter);
router.use("/venues", venuesRouter);
router.use("/events", eventsRouter);
router.use("/group-images", groupImageRouter);
router.use("/event-images", eventImageRouter);

/*

Test this route by navigating to 
http://localhost:8000/api/csrf/restore and creating a fetch request in the browser's 
DevTools console. Make a request to /api/test with the POST method,
a body of { hello: 'world' }, a "Content-Type" header, 
and an XSRF-TOKEN header with the value of the XSRF-TOKEN cookie located in your DevTools.

fetch('/api/test', {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({ hello: 'world' })
}).then(res => res.json()).then(data => console.log(data));
*/
/********SET TOKEN COOKIE*************** */

// const { restoreUser } = require("../../utils/auth.js");
// router.use(restoreUser);

router.post("/test", function (req, res) {
    res.json({ requestBody: req.body });
});

const { setTokenCookie } = require("../../utils/auth.js");

/* test routes
// //TESTROUTE
// router.get("/set-token-cookie", async (_req, res) => {
//     const user = await User.findOne({
//         where: {
//             username: "Demo-lition",
//         },
//     });
//     setTokenCookie(res, user);
//     return res.json({ user });
// });

// //REQUIRE AUTH

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });
*/

module.exports = router;
