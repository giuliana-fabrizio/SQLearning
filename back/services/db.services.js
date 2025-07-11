const db = require("../db/connect");
const db_queries = require("../queries/db.queries");
const question_queries = require("../queries/question.queries");

const getDatabases = (filters, callback) => {
    let query = db_queries.getDatabases;

    const having = [];
    const params = [];

    if (filters.work_status === "true") {
        query += " where r.id_user = ? ";
        params.push(filters.id_user);
    } else if (filters.work_status === "false") {
        query += " where r.id_user <> ? or NOT EXISTS (select * from registers as r2 where r2.id_database = d.id)";
        params.push(filters.id_user);
    }

    query += " group by d.id ";

    filters.min_people = Number(filters.min_people);
    if (!Number.isNaN(filters.min_people)) {
        having.push('count(r.id_user) >= ?');
        params.push(filters.min_people);
    }

    filters.max_people = Number(filters.max_people);
    if (!Number.isNaN(filters.max_people)) {
        having.push('count(r.id_user) <= ?');
        params.push(filters.max_people);
    }

    if (having.length > 0) query += " having " + having.join(" and ");

    db.all(query, params, (error, res) => {
        if (error) {
            return callback(error);
        }
        return callback(null, res);
    });
}

const deleteDatabase = async (id, callback) => {
    db.run(question_queries.deleteQuestions, [id], (error) => {
        if (error) {
            return callback(error);
        }
        db.run(db_queries.deleteDatabase, [id], (err, res) => {
            if (err) {
                return callback(error);
            }
            return callback(null, res);
        });
    });
}

module.exports = {
    getDatabases: getDatabases,
    deleteDatabase: deleteDatabase
}