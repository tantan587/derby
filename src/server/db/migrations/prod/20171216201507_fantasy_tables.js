

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('fantasy').createTable('leagues', (table) => {
      table.increments();
      table.string('league_id').unique().notNullable();
      table.string('league_name').unique().notNullable();
      table.string('league_password').notNullable();
      table.boolean('private_ind').notNullable();
      table.decimal('year_starting',4,0).notNullable()
      table.decimal('year_ending',4,0).notNullable()
      table.integer('max_owners').notNullable()
      table.integer('total_enrolled').notNullable()
      table.timestamps();
    }),
    knex.schema.withSchema('fantasy').createTable('users', (table) => {
      table.increments();
      table.string('league_id').notNullable()
      table.string('user_id').notNullable();
      table.string('roster_id').unique().notNullable();
      table.string('roster_name').notNullable()
      table.boolean('commissioner').notNullable()
      table.timestamps();
    }),
    knex.schema.withSchema('fantasy').createTable('rosters', (table) => {
      table.increments();

      table.string('league_id').notNullable();
      table.string('roster_id').notNullable();
      table.decimal('sports_team_id',6,0).notNullable();
      table.integer('total_points').notNullable()
      table.timestamps();
    }),
    knex.schema.withSchema('fantasy').createTable('sports', (table) => {
      table.increments();
      table.string('league_id').notNullable();
      table.decimal('sport_id',3,0).notNullable()
      table.integer('number_teams').notNullable()
      table.boolean('conf_strict').notNullable()
      table.timestamps();
    }),
    knex.schema.withSchema('fantasy').createTable('points', (table) => {
      table.increments();
      table.string('owner_id').unique().notNullable();
      table.integer('total_points').notNullable()
      table.integer('rank').notNullable()
      table.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.withSchema('sports').dropTable('leagues'),
    knex.schema.withSchema('sports').dropTable('users'),
    knex.schema.withSchema('sports').dropTable('rosters'),
    knex.schema.withSchema('sports').dropTable('sports')
  ]);
};
