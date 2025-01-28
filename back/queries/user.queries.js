const getFields = "select * from field;";

const insert = "\
    insert into user (firstname, name, mail, password, avatar, is_admin, id_field)\
    values ($1, $2, $3, $4, $5, $6, $7);\
";

module.exports = {
    getFields: getFields,
    insert: insert
}