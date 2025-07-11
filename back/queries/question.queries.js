const deleteQuestions = "delete from question where id_database = $1;";

module.exports = {
    deleteQuestions: deleteQuestions
}