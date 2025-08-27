import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/current-user-context";

const UserGoals = () => {
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [goals, setGoals] = useState({
    goal_type: "",
    income_range: "",
    credit_score_range: "",
    spending_category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [existingGoals, setExistingGoals] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    fetchUserGoals();
  }, [currentUser, navigate]);

  const fetchUserGoals = async () => {
    try {
      const response = await fetch("/api/user-goals");
      const data = await response.json();

      if (data.success && data.data) {
        setExistingGoals(data.data);
        setGoals({
          goal_type: data.data.goal_type,
          income_range: data.data.income_range,
          credit_score_range: data.data.credit_score_range,
          spending_category: data.data.spending_category,
        });
        setIsEditing(true);
      }
    } catch (err) {
      console.error("Error fetching user goals:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoals((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = isEditing
        ? `/api/user-goals/${currentUser.id}`
        : "/api/user-goals";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(goals),
      });

      const data = await response.json();

      if (data.success) {
        if (isEditing) {
          setExistingGoals(data.data);
        } else {
          setExistingGoals(data.data);
          setIsEditing(true);
        }
        setError(null);
        // Show success message or redirect
        navigate("/recommendations");
      } else {
        setError(data.error || "Failed to save goals");
      }
    } catch (err) {
      setError("Error saving goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Set Your Financial Goals
          </h1>
          <p className="text-xl text-gray-600">
            Help us find the perfect credit card for your needs
          </p>
        </div>

        {/* Goals Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Goal Type */}
            <div>
              <label
                htmlFor="goal_type"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What's your primary goal? *
              </label>
              <select
                id="goal_type"
                name="goal_type"
                value={goals.goal_type}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select your goal</option>
                <option value="build_credit">Build or rebuild credit</option>
                <option value="cash_back">Maximize cash back rewards</option>
                <option value="travel">Earn travel rewards</option>
                <option value="balance_transfer">
                  Transfer and consolidate debt
                </option>
              </select>
            </div>

            {/* Income Range */}
            <div>
              <label
                htmlFor="income_range"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What's your annual income range? *
              </label>
              <select
                id="income_range"
                name="income_range"
                value={goals.income_range}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select income range</option>
                <option value="low">Under $30,000</option>
                <option value="medium">$30,000 - $80,000</option>
                <option value="high">Over $80,000</option>
              </select>
            </div>

            {/* Credit Score Range */}
            <div>
              <label
                htmlFor="credit_score_range"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What's your credit score range? *
              </label>
              <select
                id="credit_score_range"
                name="credit_score_range"
                value={goals.credit_score_range}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select credit score range</option>
                <option value="excellent">Excellent (750+)</option>
                <option value="good">Good (670-749)</option>
                <option value="fair">Fair (580-669)</option>
                <option value="poor">Poor (under 580)</option>
              </select>
            </div>

            {/* Spending Category */}
            <div>
              <label
                htmlFor="spending_category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What's your main spending category? *
              </label>
              <select
                id="spending_category"
                name="spending_category"
                value={goals.spending_category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select spending category</option>
                <option value="general">General spending</option>
                <option value="gas">Gas and transportation</option>
                <option value="groceries">Groceries and dining</option>
                <option value="travel">Travel and entertainment</option>
                <option value="online">Online shopping</option>
              </select>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {isEditing ? "Updating..." : "Saving..."}
                  </span>
                ) : isEditing ? (
                  "Update Goals"
                ) : (
                  "Save Goals"
                )}
              </button>
            </div>
          </form>

          {/* Additional Actions */}
          {existingGoals && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ready to see your personalized recommendations?
                </p>
                <button
                  onClick={() => navigate("/recommendations")}
                  className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors duration-200"
                >
                  View Recommendations
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">
            Why set financial goals?
          </h3>
          <ul className="text-blue-800 space-y-2 text-sm">
            <li>• Get personalized credit card recommendations</li>
            <li>• Find cards that match your credit profile</li>
            <li>• Maximize rewards based on your spending habits</li>
            <li>• Avoid cards with requirements you don't meet</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserGoals;
