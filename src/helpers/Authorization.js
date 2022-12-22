const {validate} = require('../utils/jwt');


const authorization = async(req, res, next)=>{
    try{
        const token = req.headers.authorization
        if(!token){
            return res.status(401).json({
                message:'Unauthorized'
            })
        }
        if(!token.startsWith('Bearer ')){
            return res.status(401).json({
                message:'Unauthorized'
            })
        }

        const [bearer, hash] = token.split(' ');
        const payload = validate(hash, process.env.accessTokenSecret)
        if (Date.now() >= payload.exp * 1000) {
            return res.status(401).json({ message: 'Access Token Expired' });
        }
        req.user = payload;
        next();
    }
    catch(error){
        next(error)
    }
}

module.exports = authorization;