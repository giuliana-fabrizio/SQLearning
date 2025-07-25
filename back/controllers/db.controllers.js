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

const createDatabase = (req, res) => {
    const database = req.body.database;
    services.createDatabase(database, (error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const deleteDatabase = (req, res) => {
    services.deleteDatabase(req.params.id, (error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

module.exports = {
    getDatabases: getDatabases,
    createDatabase: createDatabase,
    deleteDatabase: deleteDatabase
}