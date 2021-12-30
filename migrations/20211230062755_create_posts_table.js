exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.string('content').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
};