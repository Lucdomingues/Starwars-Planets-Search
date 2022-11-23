import PropTypes from 'prop-types';
import React from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  async function apiRequired() {
    const fecthApi = await fetch('https://swapi.dev/api/planets');
    const response = await fecthApi.json();
    response.results.map((api) => delete api.residents);
    return response.results;
  }

  return (
    <MyContext.Provider value={ { apiResponse: apiRequired() } }>
      <div>
        {children}
      </div>
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default Provider;
