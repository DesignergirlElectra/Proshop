const notFound = (req,res,next) =>{
    const error = new Error(`notFound - ${req.originalUrl}`)
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    // Determine status code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Check for Mongoose CastError (invalid ObjectID)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        message = "Resource not found";
        statusCode = 404;
    }

    // Check if headers are already sent to avoid sending another response
    if (res.headersSent) {
        console.error('Headers already sent:', err.message);
        return next(err); // Delegate to the default Express error handler
    }

    // Set status and send the error response
    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? 'pancake' : err.stack, // Hide stack trace in production
    });
};
export { notFound , errorHandler}