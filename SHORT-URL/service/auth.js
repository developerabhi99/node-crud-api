var jwt = require('jsonwebtoken');

//const UserSession = new Map();
const privateKey="bjqhdhqdh6t673t73bcnm@@#^^#";
const setUser = (user) => {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role:user.role
    };

    const token = jwt.sign(payload, privateKey, { expiresIn: "1h" }); 
    return token;
}

const getUser=(token)=>{
  // return UserSession.get(id);
 return jwt.verify(token,privateKey);

}

module.exports={
    setUser,
    getUser
}