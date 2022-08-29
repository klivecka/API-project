const router = require("express").Router();

const { restoreUser } = require("../../utils/auth.js");
router.use(restoreUser);

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

const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");

router.get("/set-token-cookie", async (_req, res) => {
    const user = await User.findOne({
        where: {
            username: "Demo-lition",
        },
    });
    setTokenCookie(res, user);
    return res.json({ user });
});


router.get("/restore-user", (req, res) => {
  console.log('test')
  return res.json(req.user);
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});



module.exports = router;
