const getDatabases = "\
    select count(r.id_user) as peoples, u.avatar, d.*\
    from database as d\
    left join registers as r on r.id_database = d.id\
    inner join user as u on u.id = d.id_user\
";

const getDatabase = "\
    select d.*, coalesce(\
        json_group_array(\
            json_object(\
                'id', q.id,\
                'label', q.label,\
                'expected_result', q.expected_result,\
                'best_answer', q.best_answer\
            )\
        ) filter (where q.id is not null),\
        '[]'\
    ) as questions\
    from database as d\
    left join question as q on q.id_database = d.id\
    where d.id = ?\
    group by d.id\
";

const getDatabaseId = "select id from database where name like ?";

const getDatabaseFilename = "select filename from database where id = ?";

const createDatabase = "\
    insert into database(name, description, filename, date_created, date_updated, id_user)\
    values (?, ?, ?, CURRENT_DATE, CURRENT_DATE, ?);\
";

const updateDatabase = "\
    update database set name = ?, description = ?, filename = ?, date_updated = CURRENT_DATE\
    where id like ?;\
";

const deleteDatabase = "delete from database where id = $1;";

module.exports = {
    getDatabases: getDatabases,
    getDatabase: getDatabase,
    getDatabaseId: getDatabaseId,
    getDatabaseFilename: getDatabaseFilename,
    createDatabase: createDatabase,
    updateDatabase: updateDatabase,
    deleteDatabase: deleteDatabase
}