const getDatabases = "\
    select count(r.id_user) as peoples, u.avatar, d.*\
    from database as d\
    left join registers as r on r.id_database = d.id\
    inner join user as u on u.id = d.id_user\
";

const deleteDatabase = "delete from database where id = $1;";

module.exports = {
    getDatabases: getDatabases,
    deleteDatabase: deleteDatabase
}