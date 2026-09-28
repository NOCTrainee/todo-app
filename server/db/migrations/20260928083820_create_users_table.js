/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('users',(table)=>{
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name",150).notNullable();
    table.string("email").unique();
    table.string("password",180).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
};
