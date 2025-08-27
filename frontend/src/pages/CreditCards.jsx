import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CreditCards = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    card_type: "",
    rewards_type: "",
    annual_fee: "",
    credit_score: "",
    search: "",
  });

  useEffect(() => {
    fetchCreditCards();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, creditCards]);

  const fetchCreditCards = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/credit-cards");
      const data = await response.json();

      if (data.success) {
        setCreditCards(data.data);
        setFilteredCards(data.data);
      } else {
        setError("Failed to fetch credit cards");
      }
    } catch (err) {
      setError("Error fetching credit cards");
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...creditCards];

    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(
        (card) =>
          card.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          card.bank.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.card_type) {
      filtered = filtered.filter(
        (card) => card.card_type === filters.card_type
      );
    }

    if (filters.rewards_type) {
      filtered = filtered.filter(
        (card) => card.rewards_type === filters.rewards_type
      );
    }

    if (filters.annual_fee) {
      if (filters.annual_fee === "0") {
        filtered = filtered.filter((card) => card.annual_fee === 0);
      } else if (filters.annual_fee === "low") {
        filtered = filtered.filter((card) => card.annual_fee <= 50);
      } else if (filters.annual_fee === "high") {
        filtered = filtered.filter((card) => card.annual_fee > 50);
      }
    }

    if (filters.credit_score) {
      filtered = filtered.filter((card) =>
        card.requirements
          .toLowerCase()
          .includes(filters.credit_score.toLowerCase())
      );
    }

    setFilteredCards(filtered);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      card_type: "",
      rewards_type: "",
      annual_fee: "",
      credit_score: "",
      search: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading credit cards...</p>
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
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchCreditCards}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Credit Card
          </h1>
          <p className="text-xl text-gray-600">
            Browse and filter through our curated selection of credit cards
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <input
                type="text"
                placeholder="Search cards or banks..."
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Card Type */}
            <div>
              <select
                value={filters.card_type}
                onChange={(e) =>
                  handleFilterChange("card_type", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="cash_back">Cash Back</option>
                <option value="travel">Travel</option>
                <option value="build_credit">Build Credit</option>
                <option value="balance_transfer">Balance Transfer</option>
              </select>
            </div>

            {/* Annual Fee */}
            <div>
              <select
                value={filters.annual_fee}
                onChange={(e) =>
                  handleFilterChange("annual_fee", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Fees</option>
                <option value="0">No Annual Fee</option>
                <option value="low">Low Fee (≤$50)</option>
                <option value="high">High Fee (&gt;$50)</option>
              </select>
            </div>

            {/* Credit Score */}
            <div>
              <select
                value={filters.credit_score}
                onChange={(e) =>
                  handleFilterChange("credit_score", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Scores</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div>
              <button
                onClick={clearFilters}
                className="w-full px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredCards.length} of {creditCards.length} credit cards
          </p>
        </div>

        {/* Credit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {card.name}
                  </h3>
                  <span className="text-sm font-medium text-gray-500">
                    {card.bank}
                  </span>
                </div>

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
                    <span className="font-medium capitalize">
                      {card.rewards_type}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                    {card.card_type.replace("_", " ")}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                  {card.requirements}
                </p>

                <Link
                  to={`/credit-cards/${card.id}`}
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No credit cards match your current filters.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditCards;
