const db = require("../db/connect");
const queries = require("../queries/db.queries");

const getDatabases = (filters, callback) => {
    let request = queries.getDatabases;

    const apply_filters = [];
    const params = [];

    filters.min_people = Number(filters.min_people);
    if (!Number.isNaN(filters.min_people)) {
        apply_filters.push('count(r.id_user) >= ?');
        params.push(filters.min_people);
    }

    filters.max_people = Number(filters.max_people);
    if (!Number.isNaN(filters.max_people)) {
        apply_filters.push('count(r.id_user) <= ?');
        params.push(filters.max_people);
    }

    if (apply_filters.length > 0) {
        request += " having " + apply_filters.join(" and ");
    }

    db.all(request, params, (error, res) => {
        if (error) {
            return callback(error);
        }
        return callback(null, res);
    });
}

module.exports = {
    getDatabases: getDatabases
}