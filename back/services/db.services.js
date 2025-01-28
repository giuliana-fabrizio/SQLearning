const db = require("../db/connect");
const queries = require("../queries/db.queries");

const getDatabases = (callback) => {
    db.all(queries.getDatabases, (error, res) => {
        if (error) {
            return callback(error);
        }
        return callback(null, res);
    });
}

module.exports = {
    getDatabases: getDatabases
}