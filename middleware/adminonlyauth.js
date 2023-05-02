const NotAuthenticateError = require("../errors/NotAuthenticate");
const AdminOnlyAuth = (req,res,next)=>{
    if(req.currentUser.type!="admin"){
        return next(new NotAuthenticateError("Not authorized"));
    }
    next();
};


module.exports = AdminOnlyAuth;