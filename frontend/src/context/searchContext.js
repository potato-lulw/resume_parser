// searchContext.js
import React, { createContext, useContext, useState } from 'react';

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <SearchContext.Provider value={{ searchInput, setSearchInput }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => useContext(SearchContext);