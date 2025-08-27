const knex = require("../db/knex");

const getUserGoals = async (req, res) => {
  try {
    const userId = req.session.userId;

    const userGoals = await knex("user_goals").where("user_id", userId).first();

    res.json({
      success: true,
      data: userGoals || null,
    });
  } catch (error) {
    console.error("Error fetching user goals:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch user goals",
    });
  }
};

const createUserGoals = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { goal_type, income_range, credit_score_range, spending_category } =
      req.body;

    // Check if user already has goals
    const existingGoals = await knex("user_goals")
      .where("user_id", userId)
      .first();

    if (existingGoals) {
      return res.status(400).json({
        success: false,
        error: "User already has goals. Use PUT to update.",
      });
    }

    // Validate required fields
    if (
      !goal_type ||
      !income_range ||
      !credit_score_range ||
      !spending_category
    ) {
      return res.status(400).json({
        success: false,
        error:
          "All fields are required: goal_type, income_range, credit_score_range, spending_category",
      });
    }

    const [newGoal] = await knex("user_goals")
      .insert({
        user_id: userId,
        goal_type,
        income_range,
        credit_score_range,
        spending_category,
      })
      .returning("*");

    res.status(201).json({
      success: true,
      data: newGoal,
    });
  } catch (error) {
    console.error("Error creating user goals:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create user goals",
    });
  }
};

const updateUserGoals = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const sessionUserId = req.session.userId;

    // Ensure user can only update their own goals
    if (userId !== sessionUserId) {
      return res.status(403).json({
        success: false,
        error: "Unauthorized to update these goals",
      });
    }

    const { goal_type, income_range, credit_score_range, spending_category } =
      req.body;

    // Validate required fields
    if (
      !goal_type ||
      !income_range ||
      !credit_score_range ||
      !spending_category
    ) {
      return res.status(400).json({
        success: false,
        error:
          "All fields are required: goal_type, income_range, credit_score_range, spending_category",
      });
    }

    const [updatedGoal] = await knex("user_goals")
      .where("user_id", userId)
      .update({
        goal_type,
        income_range,
        credit_score_range,
        spending_category,
        updated_at: new Date(),
      })
      .returning("*");

    if (!updatedGoal) {
      return res.status(404).json({
        success: false,
        error: "User goals not found",
      });
    }

    res.json({
      success: true,
      data: updatedGoal,
    });
  } catch (error) {
    console.error("Error updating user goals:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update user goals",
    });
  }
};

module.exports = {
  getUserGoals,
  createUserGoals,
  updateUserGoals,
};
