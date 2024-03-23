import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContextProvider } from './context/userContext';
import { SearchProvider } from './context/searchContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <SearchProvider>

    <App />
    </SearchProvider>
    </UserContextProvider>
  </React.StrictMode>
);


