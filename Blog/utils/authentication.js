const JWT = require("jsonwebtoken")

const secret = "^!am@D!$c0d@n&Er^";

const createTokenForUser=(user)=>{
    const payload={
        _id:user._id,
        email:user.email,
        fullname:user.fullname,
        profileImageURL: user.profileImage,
        role:user.role
    }
    const token=JWT.sign(payload,secret);

    return token;

}

const validateToken=(token)=>{
    const payload = JWT.verify(token,secret);

    return payload;
}

module.exports={
    createTokenForUser,
    validateToken
}