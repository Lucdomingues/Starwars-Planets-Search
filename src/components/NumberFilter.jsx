import React, { useContext, useState } from 'react';
import MyContext from '../context/myContext';

function NumberFilter() {
  const {
    filterArr,
    setFilterArr,
    colummn,
    setColummn,
  } = useContext(MyContext);

  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });

  const waterfallFilter = () => {
    const formatedColumn = colummn.filter((element) => element !== selected.column);
    setColummn([...formatedColumn]);
    setFilterArr([...filterArr, selected]);
    setSelected({
      column: formatedColumn[0],
      condition: 'maior que',
      value: 0,
    });
  };

  return (
    <div>
      <select
        name="column"
        id="column-filtered"
        data-testid="column-filter"
        value={ selected.column }
        onChange={ ({ target }) => setSelected({
          ...selected, column: target.value,
        }) }
      >
        {colummn.map((element) => (
          <option key={ element } value={ element }>
            {element}
          </option>
        ))}
      </select>
      <select
        name="comparison"
        id="comparison-filtered"
        data-testid="comparison-filter"
        value={ selected.condition }
        onChange={ ({ target }) => setSelected({
          ...selected, condition: target.value,
        }) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        name="value"
        id="value-filtered"
        data-testid="value-filter"
        value={ selected.value }
        onChange={ ({ target }) => setSelected({
          ...selected, value: target.value,
        }) }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          waterfallFilter();
        } }
      >
        FILTRAR
      </button>
    </div>
  );
}

export default NumberFilter;
