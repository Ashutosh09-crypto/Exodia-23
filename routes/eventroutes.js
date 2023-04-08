const router = require("express").Router();
const { findAllEvents, findEvent, createTeam, joinTeam, refactorEvents } = require("../utils.js")
const { authCheck } = require("../middleware/auth");
const { findAllColleges } = require("../readFromSheet.js");


router.get("/", authCheck, async (req, res) => {
    let events = await findAllEvents();
    let events_cat = await refactorEvents(events);
    let event_pic = function(id){
        let link="";
        if(id==1) link="";
        else if(id==2) link="https://images.unsplash.com/photo-1556103255-4443dbae8e5a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8cGhvdG9ncmFwaGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80";
        else if(id==3) link="";
        else if(id==4) link="";
        else if(id==5) link="";
        else if(id==6) link="";
        else if(id==7) link="";
        else if(id==8) link="";
        else if(id==9) link="";
        else if(id==10) link="";
        else if(id==11) link="";
        if(link=="") link="./images/Logo-01.png";
        return link;
    }
    let context = {
        authenticated: req.isAuthenticated(),
        events: events,
        events_cat: events_cat,
        event_pic: event_pic
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