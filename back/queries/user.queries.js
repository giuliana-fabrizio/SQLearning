const getFields = "select * from field;";

const mailFree = "select * from user where mail like $1";

const getUser = "select * from user where id like $1";

const insert = "\
    insert into user (id, firstname, name, mail, avatar, is_admin, id_field)\
    values ($1, $2, $3, $4, $5, $6, $7);\
";

const update = "\
    update user set firstname = ?, name = ?, avatar = ?, is_admin = ?, id_field = ?\
    where id like ?;\
";

module.exports = {
    getFields: getFields,
    mailFree: mailFree,
    getUser: getUser,
    insert: insert,
    update: update
}