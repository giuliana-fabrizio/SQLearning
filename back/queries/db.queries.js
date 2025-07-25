const getDatabases = "\
    select count(r.id_user) as peoples, u.avatar, d.*\
    from database as d\
    left join registers as r on r.id_database = d.id\
    inner join user as u on u.id = d.id_user\
";

const getDatabaseId = "select id from database where name like ?";

const createDatabase = "\
    insert into database(name, description, filename, date_created, date_updated, id_user)\
    values (?, ?, ?, CURRENT_DATE, CURRENT_DATE, ?);\
";

const deleteDatabase = "delete from database where id = $1;";

module.exports = {
    getDatabases: getDatabases,
    getDatabaseId: getDatabaseId,
    createDatabase: createDatabase,
    deleteDatabase: deleteDatabase
}