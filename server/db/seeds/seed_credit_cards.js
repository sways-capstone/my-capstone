/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("credit_cards").del();

  // Inserts seed entries
  await knex("credit_cards").insert([
    {
      name: "Chase Freedom Unlimited",
      bank: "Chase",
      card_type: "cash_back",
      annual_fee: 0,
      intro_apr: 0,
      regular_apr: 20.49,
      rewards_type: "cash_back",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "Capital One Venture Rewards",
      bank: "Capital One",
      card_type: "travel",
      annual_fee: 95,
      intro_apr: null,
      regular_apr: 21.99,
      rewards_type: "miles",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "Discover it Cash Back",
      bank: "Discover",
      card_type: "cash_back",
      annual_fee: 0,
      intro_apr: 0,
      regular_apr: 18.99,
      rewards_type: "cash_back",
      requirements: "Fair to excellent credit (580+)",
    },
    {
      name: "Chase Sapphire Preferred",
      bank: "Chase",
      card_type: "travel",
      annual_fee: 95,
      intro_apr: null,
      regular_apr: 21.99,
      rewards_type: "points",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "Capital One Quicksilver",
      bank: "Capital One",
      card_type: "cash_back",
      annual_fee: 0,
      intro_apr: 0,
      regular_apr: 20.99,
      rewards_type: "cash_back",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "Citi Double Cash",
      bank: "Citi",
      card_type: "cash_back",
      annual_fee: 0,
      intro_apr: null,
      regular_apr: 19.99,
      rewards_type: "cash_back",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "American Express Gold",
      bank: "American Express",
      card_type: "travel",
      annual_fee: 250,
      intro_apr: null,
      regular_apr: 20.99,
      rewards_type: "points",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "Capital One Platinum",
      bank: "Capital One",
      card_type: "build_credit",
      annual_fee: 0,
      intro_apr: null,
      regular_apr: 26.99,
      rewards_type: "none",
      requirements: "Fair to good credit (580-670)",
    },
    {
      name: "Chase Slate Edge",
      bank: "Chase",
      card_type: "balance_transfer",
      annual_fee: 0,
      intro_apr: 0,
      regular_apr: 20.49,
      rewards_type: "none",
      requirements: "Good to excellent credit (670+)",
    },
    {
      name: "Discover it Student",
      bank: "Discover",
      card_type: "build_credit",
      annual_fee: 0,
      intro_apr: 0,
      regular_apr: 18.99,
      rewards_type: "cash_back",
      requirements: "Student with limited credit history",
    },
  ]);
};
