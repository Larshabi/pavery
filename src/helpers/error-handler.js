function ErrorHandler(err, req, res, next) {
    console.log(err);

    if (err.name === 'TokenExpiredError') {
        return res
            .status(401)
            .json({ message: 'Access token expired', name: err.name });
    }
    res.status(500).json({ message: 'An Error Occured' });
}

module.exports = ErrorHandler;