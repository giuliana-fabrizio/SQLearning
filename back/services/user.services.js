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

const insert = (user, callback) => {
    db.run(queries.insert, [
        user.firstname,
        user.name,
        user.mail,
        user.password,
        user.avatar,
        false,
        user.id_field
    ], (error, res) => {
        if (error) {
            console.error(error);
            return callback(error);
        }
        return callback(null, res);
    });
}

module.exports = {
    getFields: getFields,
    insert: insert
}