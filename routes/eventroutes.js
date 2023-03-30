const router = require("express").Router();
const { findAllEvents, findEvent, createTeam, joinTeam, refactorEvents } = require("../utils.js")
const { authCheck } = require("../middleware/auth");
const { findAllColleges } = require("../readFromSheet.js");


router.get("/", authCheck, async (req, res) => {
    let events = await findAllEvents();
    let events_cat = await refactorEvents(events)
    let context = {
        authenticated: req.isAuthenticated(),
        events: events,
        events_cat: events_cat
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
        colleges: await findAllColleges(),
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
        colleges: ["IIT MANDI", "IIT MONTY", "DTU"],
    }
    res.render('jointeam', context);
})




router.post("/joinTeam", authCheck, async (req, res) => {
    const { teamId, college, phone } = req.body;
    let checker = await joinTeam(teamId, req);
    console.log(checker);
    // req.flash("message", checker);
    res.redirect("/profile");
})

module.exports = router;