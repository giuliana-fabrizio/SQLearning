const getDatabases = "\
    select count(r.id_user) as peoples, d.*\
    from database as d\
    left join registers as r on r.id_database = d.id\
    group by d.id;\
";

module.exports = {
    getDatabases: getDatabases
}