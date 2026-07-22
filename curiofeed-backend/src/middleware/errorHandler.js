import logger from "../lib/logger.js"

export function errorHandler(err,req,res,next){
logger.error({
        err,
        method:req.method,
        url:req.originalUrl,
        },
        "Request Failed");
const statusCode = err.statusCode || 500;
res.status(statusCode).json({
        success : false ,
        message:
          process.env.NODE_ENV === "production"
          ? statusCode === 500
          ? "Internal Server Error"
          : err.message
          : err.message,
});
}