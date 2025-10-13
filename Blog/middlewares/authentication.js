const { validateToken } = require("../utils/authentication");

const checkAuthenticatedUser=(req,res,next)=>{
    const token=req.cookies.token;

    if (!token) return res.redirect("/login");

    const user = validateToken(token);

    req.user=user;

    next();     
}

const checkAuthenticationCookies=(cookiesName)=>{
    return(req,res,next)=>{
        const cookiesTokenValue = req.cookies[cookiesName];

        if(!cookiesTokenValue){
           return  next();
        }

        try{
          const payload = validateToken(cookiesTokenValue);
          req.user=payload;
        }catch(error){}
 
        next();
    }
}

module.exports={
    checkAuthenticationCookies
}