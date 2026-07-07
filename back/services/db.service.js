const db = require("../db/connect");
const fs = require('fs');
const path = require("path");
const db_queries = require("../queries/db.queries");
const question_queries = require("../queries/question.queries");
const exec_service = require("./exec.service");
const question_service = require("./question.service");

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

const getDatabase = async (id, callback) => {
    db.get(db_queries.getDatabase, [id], (error, result) => {
        if (error) { return callback(error); }
        if (result) { result.questions = JSON.parse(result.questions); }
        return callback(null, result);
    });
}

const createDatabase = async (database, callback) => {
    if (database.questions) {
        const res = await exec_service.verif_answers(database);
        if (res != "OK") { return callback(res); }
    }

    db.run(db_queries.createDatabase,
        [
            database.name,
            database.description,
            database.filename,
            database.id_user
        ],
        (error, result) => {
            if (error) { return callback(error); }

            if (database.questions) {
                db.get(db_queries.getDatabaseId, [database.name], (_, res) => {
                    for (const question of database.questions) {
                        question_service.createQuestion(question, res.id);
                    }
                });
            }

            return callback(null, result);
        }
    );
}

const updateDatabase = async (id, database, callback) => {
    if (database.questions) {
        const res = await exec_service.verif_answers(database);
        if (res != "OK") { return callback(res); }
    }

    db.get(db_queries.getDatabase, [id], (error, result) => {
        if (error) { return callback(error); }

        if (result.filename != database.filename) {
            fs.unlink(path.join("uploads", result.filename), (err) => { console.error(err); });
        }

        db.run(db_queries.updateDatabase,
        [
            database.name,
            database.description,
            result.filename != database.filename ? database.filename : result.filename,
            result.id
        ],
        (err, res) => {
            if (err) { return callback(err); }

            if (database.questions) {
                db.run(question_queries.deleteQuestions, [result.id], (err) => {
                    if (err) { return callback(err); }

                    for (const question of database.questions) {
                        question_service.createQuestion(question, result.id);
                    }
                });
            }

            return callback(null, result);
        });
    });
}

const deleteDatabase = async (id, callback) => {
    db.get(db_queries.getDatabaseFilename, [id], (error, result) => {
        if (error) { return callback(error); }

        fs.unlink(path.join("uploads", result.filename), (err) => { console.error(err); });

        db.run(question_queries.deleteQuestions, [id], (err) => {
            if (err) { return callback(err); }

            db.run(db_queries.deleteDatabase, [id], (e, res) => {
                if (e) { return callback(e); }
                return callback(null, res);
            });
        });
    });
}

module.exports = {
    getDatabases: getDatabases,
    getDatabase: getDatabase,
    createDatabase: createDatabase,
    updateDatabase: updateDatabase,
    deleteDatabase: deleteDatabase
}