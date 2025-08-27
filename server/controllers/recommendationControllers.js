const knex = require("../db/knex");

const getRecommendations = async (req, res) => {
  try {
    const userId = req.session.userId;

    // Get user's goals
    const userGoals = await knex("user_goals").where("user_id", userId).first();

    if (!userGoals) {
      return res.status(404).json({
        success: false,
        error: "User goals not found. Please set your financial goals first.",
      });
    }

    // Get all credit cards
    const allCards = await knex("credit_cards").select("*");

    // Score and rank cards based on user goals
    const scoredCards = allCards.map((card) => {
      let score = 0;

      // Goal type matching (highest weight)
      if (card.card_type === userGoals.goal_type) {
        score += 50;
      } else if (
        card.card_type === "cash_back" &&
        userGoals.goal_type === "build_credit"
      ) {
        score += 30; // Cash back cards are good for building credit
      } else if (
        card.card_type === "travel" &&
        userGoals.goal_type === "cash_back"
      ) {
        score += 20; // Travel cards can be good for cash back users
      }

      // Credit score requirements matching
      if (
        userGoals.credit_score_range === "excellent" &&
        card.requirements.includes("excellent")
      ) {
        score += 25;
      } else if (
        userGoals.credit_score_range === "good" &&
        card.requirements.includes("good")
      ) {
        score += 25;
      } else if (
        userGoals.credit_score_range === "fair" &&
        card.requirements.includes("fair")
      ) {
        score += 25;
      }

      // Annual fee preference based on income
      if (userGoals.income_range === "low" && card.annual_fee === 0) {
        score += 20;
      } else if (userGoals.income_range === "medium" && card.annual_fee <= 50) {
        score += 15;
      } else if (userGoals.income_range === "high" && card.annual_fee <= 250) {
        score += 10;
      }

      // Rewards type preference
      if (card.rewards_type === userGoals.spending_category) {
        score += 15;
      } else if (
        userGoals.spending_category === "general" &&
        card.rewards_type !== "none"
      ) {
        score += 10;
      }

      // Bonus for no annual fee cards for beginners
      if (userGoals.goal_type === "build_credit" && card.annual_fee === 0) {
        score += 10;
      }

      // Bonus for travel cards with no foreign transaction fees
      if (card.card_type === "travel" && userGoals.goal_type === "travel") {
        score += 5;
      }

      return {
        ...card,
        score,
        match_percentage: Math.min(100, Math.round((score / 100) * 100)),
      };
    });

    // Sort by score (highest first) and take top 5
    const topRecommendations = scoredCards
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Group by match quality
    const excellent = topRecommendations.filter(
      (card) => card.match_percentage >= 80
    );
    const good = topRecommendations.filter(
      (card) => card.match_percentage >= 60 && card.match_percentage < 80
    );
    const fair = topRecommendations.filter(
      (card) => card.match_percentage >= 40 && card.match_percentage < 60
    );

    res.json({
      success: true,
      data: {
        recommendations: topRecommendations,
        grouped: {
          excellent,
          good,
          fair,
        },
        user_goals: userGoals,
        total_cards_analyzed: allCards.length,
      },
    });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({
      success: false,
      error: "Failed to generate recommendations",
    });
  }
};

module.exports = {
  getRecommendations,
};
