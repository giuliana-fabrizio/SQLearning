const fs = require('fs');
const path = require("path");
const services = require('../services/db.service');

const getDatabases = (req, res) => {
    const filters = req.query;
    services.getDatabases(filters, (error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const getDatabase = (req, res) => {
    services.getDatabase(req.params.id, (error, data) => {
        if (error) {
            return res.status(500).send({ success: 0, data: error });
        }
        return res.status(200).send({ success: 1, data: data });
    });
}

const uploadFile = (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(500).send({ success: 0 });
    }
    return res.status(200).send({ success: 1 });
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

const updateDatabase = (req, res) => {
    const id = req.params.id;
    const database = req.body.database;
    services.updateDatabase(id, database, (error, data) => {
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
    getDatabase: getDatabase,
    uploadFile: uploadFile,
    createDatabase: createDatabase,
    updateDatabase: updateDatabase,
    deleteDatabase: deleteDatabase
}