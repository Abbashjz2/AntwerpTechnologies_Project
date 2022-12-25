const errorHandler = (err, req, res, next) => {
    const statueCode = res.statueCode ? res.statueCode : 500

    res.status(statueCode)
    res.json({
        message  : err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler,
}