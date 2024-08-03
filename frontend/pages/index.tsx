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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Fetching data code...
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

  return (
    <div className="container">
      <h1>Meal Search</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for meals"
        />
        <button className="filter-button" onClick={toggleDropdown}>
          Filter
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
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
        )}
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p className="no-results">Loading...</p>
      ) : (
        <div className="search-results">
          {results.length > 0 ? (
            <ul>
              {results.map((result: Meal) => (
                <li key={result.id} onClick={() => setSelectedMeal(result)}>
                  {result.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-results">No results found. Try searching for something else.</p>
          )}
        </div>
      )}
      {selectedMeal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => setSelectedMeal(null)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedMeal.name}</h2>
            <p>Allergens:</p>
            <ul>
              {selectedMeal.allergens.map((allergen: string, index: number) => (
                <li key={index}>{allergen}</li>
              ))}
            </ul>
            <button onClick={() => setSelectedMeal(null)} style={{
              marginTop: '10px',
              padding: '10px 20px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#007BFF',
              color: 'white',
              cursor: 'pointer'
            }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
