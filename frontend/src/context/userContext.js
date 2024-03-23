import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    const storedUserType = localStorage.getItem('userType');
    return storedUserType || '';
  });

  const [name, setName] = useState(() => {
    const storedName = localStorage.getItem('name');
    return storedName || '';
  });

  useEffect(() => {
    localStorage.setItem('userType', userType);
  }, [userType]);

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  const updateUserType = (newUserType) => {
    setUserType(newUserType);
  };

  const updateName = (newName) => {
    setName(newName);
  };

  return (
    <UserContext.Provider value={{ userType, updateUserType, name, updateName }}>
      {children}
    </UserContext.Provider>
  );
};
