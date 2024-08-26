const jwt=require('jsonwebtoken')
require('dotenv').config()

const verifyJWT =async (req,res,next)=>{
    const token=await req.headers.authorization
    if(!token) return res.status(401).send({message:"Unauthorized-key not found"})
    jwt.verify(token,process.env.SEC_KEY,(err,decoded)=>{
        if(err) return res.status(402).send({message:"Invalid token"})
        req.user=decoded
        next()
    })
}

const verifyRole = (allowedRole)=>{
    return (req,res,next)=>{
        if(!req?.user.role) return res.status(401).send({message:"unauthorized:no role specified"})
        if(!req.user.role[allowedRole]) return res.status(401).send({message:"unauthorized"})
        next()
    }
}

module.exports = {verifyJWT,verifyRole}