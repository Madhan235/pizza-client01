import React, { useState, useEffect } from 'react';

const GreetingMessage = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('Good Morning');
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);

  return <p className='greeting-message'>{greeting} Welcome !</p>;
};

export default GreetingMessage;