/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("credit_cards", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("bank").notNullable();
    table.string("card_type").notNullable(); // rewards, cash_back, balance_transfer, travel
    table.decimal("annual_fee", 8, 2).notNullable().defaultTo(0);
    table.decimal("intro_apr", 5, 2); // percentage, can be null
    table.decimal("regular_apr", 5, 2).notNullable(); // percentage
    table.string("rewards_type").notNullable(); // cash_back, points, miles, none
    table.text("requirements"); // text description of requirements
    table.timestamps(true, true); // created_at, updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("credit_cards");
};
