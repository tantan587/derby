var methods = {};

methods.insertIntoTable = function(knex, tableName, table, lastInsert) {
    knex.insert(table)
    .into(tableName)
    .then(result =>
    {
        console.log(result)
        if(lastInsert)
        {
            process.exit();
        }
    })
    .catch(function (err) {
        console.error(err)
        if(lastInsert)
        {
            process.exit();
        }
    });
};

methods.createTeamId =  function(sportId, teamId)
{
    return sportId * 1000 + teamId
}

methods.getSportId = function(knex, sportName, cb) {
    knex('sport_leagues')
    .select('sport_id')
    .where('sport', sportName)
    .then(result =>
    {
        if (result.length !== 1)
        {
            throw 'there is no a valid sport_id for this input'
        }
        else
        {
            console.log(result[0].sport_id)
            cb(result[0].sport_id)
        }
        
    })
    .catch(function (err) {
        console.error(err)
    });
};

exports.data = methods
