var jwt = require('jsonwebtoken');
const auth=(req,res,next)=>{
    console.log(req.cookies)
    const token = req.cookies

    if(!token){
        res.status(403).senf('Access denied')
    }
    try {
        const decode= jwt.verify(token,process.env.secret)
        console.log(decode)
        req.user=decode
    } catch (error) {
        res.status(403).send('token is invalid')
    }
    return next()

}
module.export=auth