const getFields = "select * from field;";

const mailFree = "select * from user where mail like $1";

const insert = "\
    insert into user (firstname, name, mail, avatar, is_admin, id_field)\
    values ($1, $2, $3, $4, $5, $6);\
";

module.exports = {
    getFields: getFields,
    mailFree: mailFree,
    insert: insert
}