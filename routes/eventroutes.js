const router = require("express").Router();
const { findAllEvents, findEvent, createTeam, joinTeam } = require("../utils.js")
const { authCheck } = require("../middleware/auth")


router.get("/", authCheck, async (req, res) => {
    let context = {
        authenticated: req.isAuthenticated(),
        events: await findAllEvents(),
    }

    res.render("events.ejs", context);
})


// route for a particular event page
router.get("/event", authCheck, async (req, res) => {
    const gameName = req.query.event;
    const event = await findEvent(gameName);
    if (event == null)
        res.send("No such event found");

    const context = {
        event: event,
        authenticated: req.isAuthenticated(),
    };

    res.render("event", { ...context, user: req.session.user });

})

router.get("/createTeam", authCheck, async (req, res) => {
    const gameName = req.query.event;
    const event = await findEvent(gameName);

    const context = {
        event: event,
        user: req.session.user,
        authenticated: req.isAuthenticated(),
        colleges: ["IIT MANDI", "IIT MONTY"],
    }
    res.render('createteam.ejs', context)
})

router.post("/createTeam", authCheck, async (req, res) => {
    const gameName = req.query.event;
    const event = await findEvent(gameName);

    // validation need to  be added here
    let val = await createTeam(req, event);
    // req.flash("message", val);

    res.redirect("/profile");
})


router.get("/joinTeam", authCheck, async (req, res) => {
    const context = {
        authenticated: req.isAuthenticated(),
        colleges: ["IIT MANDI", "IIT MONTY"],
    }
    res.render('jointeam', context);
})




router.post("/joinTeam", authCheck, async (req, res) => {
    const { teamId, college, phone } = req.body;
    let checker = await joinTeam(teamId, req);
    // req.flash("message", checker);
    res.redirect("/profile");
})

module.exports = router;