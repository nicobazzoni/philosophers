import React, { useState, useEffect } from 'react';
import think1 from './assets/think1.png';
import think2 from './assets/think2.png';
import think3 from './assets/think3.png';
import './index.css';

const defaultPhotos = [think1, think2, think3];

function getRandomDefaultPhoto() {
  const randomIndex = Math.floor(Math.random() * defaultPhotos.length);
  return defaultPhotos[randomIndex];
}

function PhilosopherInfo() {
  const [searchQuery, setSearchQuery] = useState('');
  const [philosopherData, setPhilosopherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Generate a random query when the page first loads
    const randomQueries = ['Socrates', 'Plato', 'Aristotle', 'Descartes', 'Kant'];
    const randomIndex = Math.floor(Math.random() * randomQueries.length);
    const initialQuery = randomQueries[randomIndex];
    setSearchQuery(initialQuery);
  }, []);

  const fetchData = async () => {
    if (!searchQuery) {
      // No search query provided, clear the data
      setPhilosopherData(null);
      return;
    }

    setIsLoading(true);

    const url = `https://list-of-philosophers.p.rapidapi.com/Philosopher-By-Name?name=${encodeURIComponent(
      searchQuery
    )}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '90d9cad4aemsh0c2ae781060c8c2p1a0ee0jsna36176967a11',
        'X-RapidAPI-Host': 'list-of-philosophers.p.rapidapi.com',
      },
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();
        setPhilosopherData(result);
      } else {
        // Handle errors when the philosopher is not found or other issues
        setPhilosopherData(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data when the searchQuery changes
    fetchData();
  }, [searchQuery]);

  return (
    <div className="p-4 bg-stone-900 space-y-2 text-white">
      <h1 className="text-2xl font-semibold tracking-widest bg-stone-900 rounded-md">Philosophers</h1>
      <input
        type="text"
        style={{ outline: 'none' }}
        placeholder="Search Philosopher by Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      {isLoading && <p>Loading...</p>}

      {philosopherData && !isLoading && philosopherData.results && (
        <div className='space-y-2'>
          {philosopherData.results.map((philosopher, index) => (
            <div key={index} className="bg-stone-100 border-t-2 text-black flex flex-col items-center p-4 rounded-md">
              <h1 className="text-2xl font-semibold mt-4 bg-white p-1 rounded-md">{philosopher.Name}</h1>
              <p className="text-lg mt-2 space-x-2 bg-white rounded-md text-stone-800 p-2">{philosopher.Born}</p>
              <p className="text-lg font-bold bg-white p-1 mt-2 rounded-md">{philosopher.Philosophy_type}</p>
              <div className="flex items-center justify-center mt-4">
                {philosopher.Image_url ? (
                  <img src={philosopher.Image_url} alt={philosopher.Name} className="max-w-full h-auto rounded-md" />
                ) : (
                  // Display a random default photo when no image is available
                  <img src={getRandomDefaultPhoto()} alt="Default" className="mt-4 rounded bg-white" height={200} />
                )}
              </div>
              <h2 className="text-xl text-black font-semibold mt-4 p-1 bg-white rounded-md">
                {philosopher.Life}
              </h2>
            </div>
          ))}
        </div>
      )}

      {philosopherData && philosopherData.results && philosopherData.results.length === 0 && (
        <p className="mt-4 text-red-600">Philosopher not found.</p>
      )}
    </div>
  );
}

export default PhilosopherInfo;
