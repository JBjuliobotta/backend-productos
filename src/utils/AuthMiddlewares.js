const jwt=require('jsonwebtoken');

function isAuth(req, res, next){
    const auth=req.get("Authorization");

    if(!auth){
        return res.status(401).json({message:"no autorizado"});
    }

    try {
        const token=auth.split(" ")[1];
        const decodeToken=jwt.verify(token, process.env.SECRET_KEY);
        req.user=decodeToken;
        next();
    } catch (error) {
        //next(new Error('token vencido'));
        return res.status(401).json({message:"token invalido y/o vencido"});
    }
}

function isAdmin(req, res, next) {
        if(req.user.role!=="Admin") {
            return res.status(403).json({message:"acceso denegado"});
        }

        next();
}

module.exports={isAuth, isAdmin};