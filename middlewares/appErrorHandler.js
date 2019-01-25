let errorHandler = (err,req,res,next)=>{
    console.log("Application error handler called");
    console.log(err);
    res.send("some error occured at global level");
}

let notFoundHandler=(req,res,next)=>{
    console.log("Not Found Handler Called");
    res.status(404).send('Route not found in the application');
} 

module.exports={
    globalErrorHandler:errorHandler,
    globalNotFoundHandler:notFoundHandler
}