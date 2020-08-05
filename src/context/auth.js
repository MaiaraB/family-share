import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

function AuthProvider(props) {

  const existingTokens = JSON.parse(localStorage.getItem('tokens'));//JSON.parse();
  // console.log("EXITING TOKENS", existingTokens);
  const [authToken, setAuthToken] = useState(existingTokens);
  const [userData, setUserData] = useState();

  const setTokens = (data) => {
    // console.log("SET TOKENS", data);
    if (data === undefined) {
      localStorage.removeItem('tokens');
      setAuthToken();
    } else {
      localStorage.setItem('tokens', JSON.stringify(data));
      setAuthToken(data);
    }
  };

  const fetchUserData = (token) => {
    if (token !== null && token !== undefined && token !== 'undefined') {
      axios.get(`${process.env.REACT_APP_API_VERIFY_USER}/${token}`)
      .then((result) => {
        // console.log('FETCH DATA RESULT: ', result);
        setUserData(result.data);
      })
      .catch((err) => {
        // console.log('FETCH DATA ERROR: ', err);
        setUserData({});
        setTokens();
      });
    }
  }

  const login = async (email, password) => {
    try {
      const result = await axios.post(process.env.REACT_APP_API_LOGIN, {
        email,
        password,
      });
      if (result.status === 200) {
        setTokens(result.data.token);
        fetchUserData(result.data.token);
        return true;
      }
      else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };
  const logout = () => {
    setTokens();
    setUserData();
  };
  const signup = async (email, firstName, lastName, phoneNumber, country, username, password, confirmPassword) => {
    try {
      const result = await axios.post(process.env.REACT_APP_API_SIGNUP, {
        email, firstName, lastName, phoneNumber, country, username, password, confirmPassword
      });
      if (result.status === 200) {
        setTokens(result.data.token);
        fetchUserData(result.data.token);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      return false;
    }
  };

  useEffect(() => {
    fetchUserData(authToken);
  }, [authToken]);

  return <AuthContext.Provider value={{ userData, login, logout, signup }} {...props} />;
}

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };