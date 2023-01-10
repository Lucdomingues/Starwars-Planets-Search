import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function NameFilter() {
  const { inputName, setInputName } = useContext(MyContext);

  return (
    <input
      type="text"
      name="name"
      id="name-filtered"
      data-testid="name-filter"
      placeholder="buscar"
      value={ inputName }
      onChange={ ({ target }) => setInputName(target.value) }
    />
  );
}

export default NameFilter;
