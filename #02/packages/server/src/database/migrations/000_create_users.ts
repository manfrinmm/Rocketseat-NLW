import Knex from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("avatar_url").notNullable();
    table.string("whatsapp").notNullable();
    table.string("bio").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("users");
}
