const db = require("../db/connect");
const question_queries = require("../queries/question.queries");

const createQuestion = (question, id_database) => {
    db.run(
        question_queries.createQuestion,
        [
            question.label,
            question.expected_result,
            question.best_answer,
            id_database
        ],
        (error) => { if (error) { console.error(`Create question : ${error}`) } }
    );
}

module.exports = {
    createQuestion: createQuestion
}