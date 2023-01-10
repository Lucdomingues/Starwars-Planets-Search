import PropTypes from 'prop-types';
import React, { useMemo, useState, useEffect } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [apiResults, setApiResults] = useState([]);
  const [inputName, setInputName] = useState('');
  const [genericFilter, setGenericFilter] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [colummn, setColummn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);

  async function apiRequired() {
    const fecthApi = await fetch('https://swapi.dev/api/planets');
    const response = await fecthApi.json();
    response.results.map((api) => delete api.residents);
    setApiResults(response.results);
  }

  useEffect(() => {
    apiRequired();
  }, []);

  const values = useMemo(() => ({
    apiResults,
    setApiResults,
    inputName,
    setInputName,
    genericFilter,
    setGenericFilter,
    filterArr,
    setFilterArr,
    colummn,
    setColummn,
  }), [
    apiResults,
    setApiResults,
    inputName,
    setInputName,
    genericFilter, setGenericFilter, filterArr, setFilterArr, colummn, setColummn]);

  return (
    <MyContext.Provider value={ values }>
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
