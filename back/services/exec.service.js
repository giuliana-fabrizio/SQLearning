const { open } = require('sqlite');
const path = require('path');
const sqlite3 = require('sqlite3');

const connect_to_db = async (filename) => {
    return open({
        filename: path.join(__dirname, '..', 'uploads', filename),
        driver: sqlite3.Database
    });
}

const verif_answers = async (database) => {
    try {
        const sdb = await connect_to_db(database.filename);

        for (const question of database.questions) {
            if (
                question.best_answer.includes("create") ||
                question.best_answer.includes("update") ||
                question.best_answer.includes("delete")
            ) {
                return "Queries mustn't includes create or update or delete query.";
            }

            await sdb.all(question.best_answer);
        }

        await sdb.close();
        return "OK";
    } catch (e) {
        console.error(e)
        return e.message || e;
    }
}

module.exports = {
    verif_answers: verif_answers
}