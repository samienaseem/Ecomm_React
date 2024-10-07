import React, { useEffect, useState } from 'react';

const icons = [
  // T-shirt icon
  <svg
    key="tshirt"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
  </svg>,
  // Jeans icon
  <svg
    key="jeans"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L6 22" />
    <path d="M18 2L18 22" />
    <path d="M6 6L18 6" />
    <path d="M6 10L18 10" />
    <path d="M8 14L16 14" />
    <path d="M8 18L16 18" />
  </svg>,
  // Shoes icon
  <svg
    key="shoes"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2v-7" />
    <path d="M3 12h18" />
    <path d="M7 12v-2a4 4 0 014-4h2a4 4 0 014 4v2" />
  </svg>,
  // Hanger icon
  <svg
    key="hanger"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2L12 6" />
    <path d="M12 6C14.2091 6 16 7.79086 16 10L22 10L12 22L2 10L8 10C8 7.79086 9.79086 6 12 6Z" />
  </svg>,
  // Socks icon
  <svg
    key="socks"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 2L8 14C8 18 5 20 3 21" />
    <path d="M16 2L16 14C16 18 19 20 21 21" />
    <path d="M8 8L16 8" />
  </svg>,
  // Jacket icon
  <svg
    key="jacket"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 2L8 2L3 7L3 22L21 22L21 7L16 2Z" />
    <path d="M12 2L12 22" />
    <path d="M8 12L16 12" />
  </svg>,
];

const Loading = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 1000); // Change icon every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="loading-container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        className="icon-container"
        style={{
          backgroundColor: 'white',
          borderRadius: '50%',
          padding: '20px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        }}
      >
        {icons[currentIconIndex]}
      </div>
      <p
        style={{
          marginTop: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        Loading...
      </p>
    </div>
  );
};

export default Loading;
