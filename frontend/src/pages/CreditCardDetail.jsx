import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const CreditCardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCardDetails();
  }, [id]);

  const fetchCardDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/credit-cards/${id}`);
      const data = await response.json();

      if (data.success) {
        setCard(data.data);
      } else {
        setError("Failed to fetch card details");
      }
    } catch (err) {
      setError("Error fetching card details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading card details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !card) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">{error || "Card not found"}</p>
            <Link
              to="/credit-cards"
              className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Back to Credit Cards
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCardTypeColor = (type) => {
    const colors = {
      cash_back: "bg-green-100 text-green-800",
      travel: "bg-blue-100 text-blue-800",
      build_credit: "bg-yellow-100 text-yellow-800",
      balance_transfer: "bg-purple-100 text-purple-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  const getRewardsTypeColor = (type) => {
    const colors = {
      cash_back: "bg-green-100 text-green-800",
      miles: "bg-blue-100 text-blue-800",
      points: "bg-purple-100 text-purple-800",
      none: "bg-gray-100 text-gray-800",
    };
    return colors[type] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            to="/credit-cards"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Credit Cards
          </Link>
        </div>

        {/* Card Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {card.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Issued by {card.bank}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCardTypeColor(
                    card.card_type
                  )}`}
                >
                  {card.card_type.replace("_", " ")}
                </span>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRewardsTypeColor(
                    card.rewards_type
                  )}`}
                >
                  {card.rewards_type !== "none"
                    ? card.rewards_type
                    : "No Rewards"}
                </span>
              </div>
            </div>

            <div className="lg:ml-8 lg:text-right">
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {card.annual_fee === 0
                  ? "No Annual Fee"
                  : `$${card.annual_fee}/year`}
              </div>
              <p className="text-gray-600">Annual Fee</p>
            </div>
          </div>
        </div>

        {/* Card Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Features */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Key Features
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Intro APR</span>
                <span className="font-medium">
                  {card.intro_apr === 0 ? `${card.intro_apr}%` : "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Regular APR</span>
                <span className="font-medium">{card.regular_apr}%</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-600">Rewards Type</span>
                <span className="font-medium capitalize">
                  {card.rewards_type}
                </span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-gray-600">Card Type</span>
                <span className="font-medium capitalize">
                  {card.card_type.replace("_", " ")}
                </span>
              </div>
            </div>
          </div>

          {/* Requirements & Eligibility */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Requirements & Eligibility
            </h2>

            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 mb-2">
                  Credit Score Requirements
                </h3>
                <p className="text-blue-800">{card.requirements}</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-medium text-green-900 mb-2">Best For</h3>
                <p className="text-green-800">
                  {card.card_type === "cash_back" &&
                    "Everyday spending and maximizing cash rewards"}
                  {card.card_type === "travel" &&
                    "Frequent travelers and maximizing travel benefits"}
                  {card.card_type === "build_credit" &&
                    "Building or rebuilding credit history"}
                  {card.card_type === "balance_transfer" &&
                    "Consolidating debt and saving on interest"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                About This Card
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The {card.name} is designed for{" "}
                {card.card_type.replace("_", " ")} purposes.
                {card.rewards_type !== "none" &&
                  ` It offers ${card.rewards_type} rewards`}
                {card.annual_fee === 0 && " with no annual fee"}.
                {card.intro_apr === 0 &&
                  ` It features a ${card.intro_apr}% introductory APR period.`}
              </p>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Considerations</h3>
              <ul className="text-gray-600 space-y-2">
                {card.annual_fee > 0 && (
                  <li>• Annual fee of ${card.annual_fee}</li>
                )}
                {card.regular_apr > 20 && (
                  <li>• Higher APR may increase costs if carrying balance</li>
                )}
                {card.rewards_type === "none" && <li>• No rewards program</li>}
                <li>• Credit score requirements: {card.requirements}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/goals"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Set Your Goals
            </Link>
            <Link
              to="/recommendations"
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
            >
              Get Personalized Recommendations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardDetail;
