

const errorHandler = (e, res) => {
    // This is the only response when there is an error so we don't check error type for now
    return res.status(400).send({
        "error": "Could not decode request: JSON parsing failed"
    })
};

module.exports = errorHandler