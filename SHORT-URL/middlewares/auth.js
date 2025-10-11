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

module.exports={
    restrictToLoggedInUser
}