const EventLogger = (_req, _res, next) => {
    console.log('EventLogger. Tercer Middleware')
    console.log({
        url : _req.originalUrl, 
        method: _req.method, 
        body: _req.body
    })
    next();
}

module.exports = EventLogger;