const services = require('../services/db.services');

const getDatabases = (req, res) => {
    const filters = req.query;
    services.getDatabases(filters, (error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

module.exports = {
    getDatabases: getDatabases
}