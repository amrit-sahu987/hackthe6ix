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
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

  const handleSearch = async () => {
    setLoading(true);
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
    } catch (error) {
      console.error('Error fetching search results', error);
    }
    setLoading(false);
  };

  const handleAllergenChange = (allergen: string) => {
    setAllergens(prev =>
      prev.includes(allergen)
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
  };

  const handleClosePopup = () => {
    setSelectedMeal(null);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for meals"
          style={{ flex: 1 }}
        />
        <button onClick={() => setShowFilters(!showFilters)}>Filter</button>
      </div>
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => setQuery(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {showFilters && (
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                value="gluten"
                onChange={() => handleAllergenChange('gluten')}
              />
              Gluten
            </label>
            <label>
              <input
                type="checkbox"
                value="dairy"
                onChange={() => handleAllergenChange('dairy')}
              />
              Dairy
            </label>
            <label>
              <input
                type="checkbox"
                value="fish"
                onChange={() => handleAllergenChange('fish')}
              />
              Fish
            </label>
            {/* Add more allergens as needed */}
          </div>
        </div>
      )}
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {results.map((result: Meal) => (
            <li key={result.id} onClick={() => handleMealClick(result)}>
              {result.name}
            </li>
          ))}
        </ul>
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
          onClick={handleClosePopup}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '10px',
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
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Meal Search</h1>
      //<SearchFilter />
    </div>
  );
};

export default Home;

