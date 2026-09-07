const jwt = require('jsonwebtoken');

const authUser = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"token not provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next()


    }catch(err){
        return res.status(401).json({
            message:"invalid token or expire"
        })
    }
     
    
};
   

module.exports = authUser