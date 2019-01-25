

let exampleMiddleware=(req,res,next)=>{
    req.user = {'firstName':'vivek','lastName':'surushe' }
    next();
}

module.exports={
    exampleMiddleware:exampleMiddleware
}