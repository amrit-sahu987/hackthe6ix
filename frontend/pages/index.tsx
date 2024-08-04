import React, { useState, useEffect } from 'react';

interface Meal {
  id: number;
  name: string;
  allergens: string[];
}

const SearchFilter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [allergens, setAllergens] = useState<string[]>([]);
  const [results, setResults] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query) {
        try {
          const url = new URL('http://127.0.0.1:5000/api/autocomplete');
          url.searchParams.append('q', query);

          const response = await fetch(url.toString());
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: string[] = await response.json();
          setSuggestions(data);
        } catch (error) {
          console.error('Error fetching autocomplete suggestions', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [query]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [query, allergens]);

  const handleSearch = async () => {
    setLoading(true);
    setHasSearched(true);
    try {
      const url = new URL('http://127.0.0.1:5000/api/search');
      url.searchParams.append('q', query);
      allergens.forEach(allergen => url.searchParams.append('allergens', allergen));

      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: Meal[] = await response.json();
      setResults(data);
      setSuggestions([]); // Clear suggestions after search
    } catch (error) {
      console.error('Error fetching search results', error);
    }
    setLoading(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAllergenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    setAllergens((prev) =>
      checked ? [...prev, value] : prev.filter((allergen) => allergen !== value)
    );
  };

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
  };

  const handleClosePopup = () => {
    setSelectedMeal(null);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions after clicking a suggestion
  };

  return (
    <div className="container">
      <h1>Meal Search</h1>
      <div className="search-container">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for meals"
          className="input"
        />
        <button className="filter-button" onClick={toggleDropdown}>
          Filter
        </button>
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          <div className="filters">
            <label>
              <input
                type="checkbox"
                value="gluten"
                onChange={handleAllergenChange}
              />
              Gluten
            </label>
            <label>
              <input
                type="checkbox"
                value="dairy"
                onChange={handleAllergenChange}
              />
              Dairy
            </label>
            <label>
              <input
                type="checkbox"
                value="fish"
                onChange={handleAllergenChange}
              />
              Fish
            </label>
            {/* Add more allergens as needed */}
          </div>
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="suggestion" onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div className="search-results">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            {results.length > 0 ? (
              <ul className="results">
                {results.map((result: Meal) => (
                  <li key={result.id} onClick={() => handleMealClick(result)}>
                    {result.name}
                  </li>
                ))}
              </ul>
            ) : (
              hasSearched && <p className="no-results">No results found. Try searching for something else.</p>
            )}
          </>
        )}
      </div>
      {selectedMeal && (
        <div className="popupOverlay" onClick={handleClosePopup}>
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <h2>{selectedMeal.name}</h2>
          <p>Allergens:</p>
          {selectedMeal.allergens.length > 0 ? (
            <ul className="allergens-list">
              {selectedMeal.allergens.map((allergen: string, index: number) => (
                <li key={index}>
                  {/* Replace with appropriate icon */}
                  <span role="img" aria-label={allergen}>⚠️</span> {allergen}
                </li>
              ))}
            </ul>
          ) : (
            <p>No allergens listed.</p>
          )}
          <button className="close-button" onClick={handleClosePopup}>Close</button>
        </div>
      </div>      
      )}
    </div>
  );
};

export default SearchFilter;
