
const router = require("express").Router();

const { findTeamById, findAllMembersOfTeam, findUserById, deleteTeam, deleteTeamMember } = require("../utils")
const { authCheck } = require("../middleware/auth")

router.get("/team", authCheck, async (req, res) => {
    const teamId = req.query.teamId;
    const teamDetail = await findTeamById(teamId);

    if (teamDetail == null) {
        res.send("No such team found!");
        return;
    }

    const members = await findAllMembersOfTeam(teamDetail);
    const teamLeader = await findUserById(teamDetail.teamLeader);

    const context = {
        team: teamDetail,
        teamMembers: members,
        leader: teamLeader,
        user: req.user,
        authenticated: req.isAuthenticated(),
    }
    res.render("team", context);
})

router.post("/team/deleteTeam", authCheck, async (req, res) => {
    const teamId = req.body.teamId;
    let checker = await deleteTeam(teamId, req.user);

    if (checker)
        req.flash("message", "Team deleted successfully");
    else
        req.flash("message", "Sorry, something went wrong");
    res.redirect("/profile");
})

router.post("/team/deleteMember", authCheck, async (req, res) => {
    const teamId = req.body.teamId;
    const memberId = req.body.memberId;

    let checker = await deleteTeamMember(teamId, memberId, req.user);

    if (checker)
        req.flash("message", "Member removed successfully");
    else
        req.flash("message", "Sorry, something went wrong");
    res.redirect("/profile");
})


module.exports = router