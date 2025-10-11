

const UserSession = new Map();

const setUser=(id,user)=>{
    
    UserSession.set(id,user);
}

const getUser=(id)=>{
   return UserSession.get(id);
}

module.exports={
    setUser,
    getUser
}