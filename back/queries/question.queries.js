const createQuestion = "\
    insert into question(label, best_answer, id_database) \
    values (?, ?, ?);\
";

const deleteQuestions = "delete from question where id_database = $1;";

module.exports = {
    createQuestion: createQuestion,
    deleteQuestions: deleteQuestions
}