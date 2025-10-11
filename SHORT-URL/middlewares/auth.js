const { getUser } = require("../service/auth");

const restrictToLoggedInUser=(req,res,next)=>{
    const userUid = req.cookies.uid;

    if(!userUid) return res.redirect("/login");
    const user=getUser(userUid);
    //console.log("user ",user);
    if(!user) return res.redirect("/login");
    req.user=user;

    next();
}

const restrictToRole=(roles = [])=>{
    return (req,res,next)=>{
        if(!req.user) return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("Unauthorized");

        return next();

    }
}

module.exports={
    restrictToLoggedInUser,
    restrictToRole
}