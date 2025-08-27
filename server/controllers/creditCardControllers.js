const knex = require("../db/knex");

const listCreditCards = async (req, res) => {
  try {
    const { card_type, rewards_type, annual_fee, credit_score } = req.query;

    let query = knex("credit_cards").select("*");

    // Apply filters if provided
    if (card_type) {
      query = query.where("card_type", card_type);
    }

    if (rewards_type) {
      query = query.where("rewards_type", rewards_type);
    }

    if (annual_fee !== undefined) {
      if (annual_fee === "0") {
        query = query.where("annual_fee", 0);
      } else if (annual_fee === "low") {
        query = query.where("annual_fee", "<=", 50);
      } else if (annual_fee === "high") {
        query = query.where("annual_fee", ">", 50);
      }
    }

    if (credit_score) {
      if (credit_score === "excellent") {
        query = query.where("requirements", "like", "%excellent%");
      } else if (credit_score === "good") {
        query = query.where("requirements", "like", "%good%");
      } else if (credit_score === "fair") {
        query = query.where("requirements", "like", "%fair%");
      }
    }

    const creditCards = await query.orderBy("name");

    res.json({
      success: true,
      data: creditCards,
      count: creditCards.length,
    });
  } catch (error) {
    console.error("Error fetching credit cards:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch credit cards",
    });
  }
};

const showCreditCard = async (req, res) => {
  try {
    const { id } = req.params;

    const creditCard = await knex("credit_cards").where("id", id).first();

    if (!creditCard) {
      return res.status(404).json({
        success: false,
        error: "Credit card not found",
      });
    }

    res.json({
      success: true,
      data: creditCard,
    });
  } catch (error) {
    console.error("Error fetching credit card:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch credit card",
    });
  }
};

module.exports = {
  listCreditCards,
  showCreditCard,
};
