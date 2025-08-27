import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/current-user-context";

const Recommendations = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchRecommendations();
  }, [currentUser, navigate]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/recommendations");
      const data = await response.json();

      if (data.success) {
        setRecommendations(data.data);
      } else {
        if (data.error && data.error.includes("goals not found")) {
          navigate("/goals");
          return;
        }
        setError(data.error || "Failed to fetch recommendations");
      }
    } catch (err) {
      setError("Error fetching recommendations");
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    return "Fair Match";
  };

  if (!currentUser) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              Analyzing your goals and finding the best matches...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchRecommendations}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
            >
              Try Again
            </button>
            <Link
              to="/goals"
              className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Update Goals
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Personalized Recommendations
          </h1>
          <p className="text-xl text-gray-600">
            Based on your financial goals and profile
          </p>
        </div>

        {/* User Goals Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Your Financial Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Primary Goal</p>
              <p className="font-medium text-blue-900 capitalize">
                {recommendations.user_goals.goal_type.replace("_", " ")}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Income Range</p>
              <p className="font-medium text-green-900 capitalize">
                {recommendations.user_goals.income_range}
              </p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-600">Credit Score</p>
              <p className="font-medium text-yellow-900 capitalize">
                {recommendations.user_goals.credit_score_range}
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600">Spending Category</p>
              <p className="font-medium text-purple-900 capitalize">
                {recommendations.user_goals.spending_category}
              </p>
            </div>
          </div>
        </div>

        {/* Recommendations by Category */}
        {recommendations.grouped.excellent.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Excellent Matches ({recommendations.grouped.excellent.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.grouped.excellent.map((card) => (
                <RecommendationCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}

        {recommendations.grouped.good.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
              Good Matches ({recommendations.grouped.good.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.grouped.good.map((card) => (
                <RecommendationCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}

        {recommendations.grouped.fair.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
              Fair Matches ({recommendations.grouped.fair.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.grouped.fair.map((card) => (
                <RecommendationCard key={card.id} card={card} />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/goals"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Update Your Goals
            </Link>
            <Link
              to="/credit-cards"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Browse All Cards
            </Link>
          </div>
        </div>

        {/* Analysis Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">
            How we analyzed your matches
          </h3>
          <p className="text-blue-800 text-sm mb-3">
            We analyzed {recommendations.total_cards_analyzed} credit cards
            based on your goals, credit score, income, and spending preferences.
            Each card is scored and ranked to show you the best options for your
            financial situation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-900">
                Goal Matching (50 points)
              </p>
              <p className="text-blue-700">
                Primary weight for your financial objective
              </p>
            </div>
            <div>
              <p className="font-medium text-blue-900">
                Credit Score (25 points)
              </p>
              <p className="text-blue-700">
                Ensuring you meet card requirements
              </p>
            </div>
            <div>
              <p className="font-medium text-blue-900">
                Income & Fees (20 points)
              </p>
              <p className="text-blue-700">
                Matching annual fees to your budget
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Recommendation Card Component
const RecommendationCard = ({ card }) => {
  const getMatchColor = (percentage) => {
    if (percentage >= 80) return "bg-green-100 text-green-800";
    if (percentage >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const getMatchLabel = (percentage) => {
    if (percentage >= 80) return "Excellent Match";
    if (percentage >= 60) return "Good Match";
    return "Fair Match";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
      <div className="p-6">
        {/* Match Score */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(
              card.match_percentage
            )}`}
          >
            {getMatchLabel(card.match_percentage)}
          </span>
          <span className="text-2xl font-bold text-blue-600">
            {card.match_percentage}%
          </span>
        </div>

        {/* Card Info */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {card.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">{card.bank}</p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Annual Fee:</span>
            <span className="font-medium">
              {card.annual_fee === 0 ? "No Fee" : `$${card.annual_fee}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">APR:</span>
            <span className="font-medium">
              {card.intro_apr === 0
                ? `${card.intro_apr}% intro, then ${card.regular_apr}%`
                : `${card.regular_apr}%`}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600">Rewards:</span>
            <span className="font-medium capitalize">{card.rewards_type}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize mr-2">
            {card.card_type.replace("_", " ")}
          </span>
          {card.rewards_type !== "none" && (
            <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full capitalize">
              {card.rewards_type}
            </span>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-4">{card.requirements}</p>

        <Link
          to={`/credit-cards/${card.id}`}
          className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Recommendations;
