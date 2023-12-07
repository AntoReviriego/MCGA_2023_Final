const EventLogger = (req, res, next) => {
    console.log('EventLogger. Tercer Middleware')
    console.log({
        url : req.originalUrl, 
        method: req.method, 
        body: req.body
    })
    next();
}

module.exports = EventLogger;