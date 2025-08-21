/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_goals", (table) => {
    table.increments("id").primary();
    table.integer("user_id").unsigned().notNullable();
    table.string("goal_type").notNullable(); // build_credit, cash_back, balance_transfer, travel_rewards
    table.string("income_range").notNullable(); // low, medium, high
    table.string("credit_score_range").notNullable(); // poor, fair, good, excellent
    table.string("spending_category").notNullable(); // groceries, dining, travel, gas, etc.
    table.timestamps(true, true); // created_at, updated_at

    // Foreign key constraint
    table
      .foreign("user_id")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_goals");
};
