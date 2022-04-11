import React, { useState, useEffect } from 'react';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [thoughts, setThoughts] = useState([]);

  // useEffect to load users thoughts on
  // webpage mount

  useEffect(() => {
    const fetchData = async () => {
      // try and catch incase we get bad data or none
    
      try {
        const res = await fetch('/api/users');
        const jsonData = await res.json();
        // Because I used the scan method
        // I need to sort the data myself.
        const _data = jsonData.sort((a,b) => 
          a.createdAt < b.createdAt ? 1 : -1,
        );
        setThoughts([..._data]);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          <ThoughtForm />
        </div>
        <div className={`col-12 mb-3 `}>
          {!isLoaded ? (
            <div>Loading...</div>
          ) : (
              <ThoughtList thoughts={thoughts} setThoughts={setThoughts} title="Some Feed for Thought(s)..." />
            )}
        </div>
      </div>
    </main>
  );
};

export default Home;
