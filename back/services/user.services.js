const db = require("../db/connect");
const queries = require("../queries/user.queries");

const getFields = (callback) => {
    db.all(queries.getFields, (error, res) => {
        if (error) {
            return callback(error);
        }
        return callback(null, res);
    });
}

module.exports = {
    getFields: getFields
}