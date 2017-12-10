

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return  knex.withSchema('sports').table('leagues').del()
    .then(function () {
      // Inserts seed entries
      return knex.withSchema('sports').table('leagues').insert([
          {sport_name:'NBA', sport_id:'101', type:'Basketball'},
          {sport_name:'NFL', sport_id:'102', type:'Football'},
          {sport_name:'MLB', sport_id:'103', type:'Baseball'},
          {sport_name:'NHL', sport_id:'104', type:'Hockey'},
          {sport_name:'NCAAF', sport_id:'105', type:'Football'},
          {sport_name:'NCAAB', sport_id:'106', type:'Basketball'},
          {sport_name:'EPL', sport_id:'107', type:'Soccer'},
      ]);
    });
};
