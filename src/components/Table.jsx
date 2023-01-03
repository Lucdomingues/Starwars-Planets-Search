import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/myContext';

function Table() {
  const context = useContext(MyContext);
  const [apiResults, setApiResults] = useState([]);
  const [inputName, setInputName] = useState('');
  const [genericFilter, setGenericFilter] = useState([]);
  const [colummn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]);
  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: 0,
  });

  useEffect(() => {
    async function responseApi() {
      const response = await context.apiResponse;
      setApiResults(response);
    }
    responseApi();
  }, [context.apiResponse]);

  const resultSearchName = apiResults
    .filter((element) => element.name.includes(inputName));

  const resultsFilterNumber = () => {
    const { column, condition, value } = selected;
    const filterDad = resultSearchName.filter((element) => {
      switch (condition) {
      case 'maior que':
        return Number(element[column]) > Number(value);
      case 'igual a':
        return Number(value) === Number(element[column]);
      case 'menor que':
        return Number(element[column]) < Number(value);
      default:
        return true;
      }
    });
    return filterDad;
  };

  const isFiltered = genericFilter.length > 0 ? genericFilter : resultSearchName;

  console.log(isFiltered);

  return (
    <div>
      <form>
        <input
          type="text"
          name="name"
          id="name-filtered"
          data-testid="name-filter"
          placeholder="buscar"
          value={ inputName }
          onChange={ ({ target }) => setInputName(target.value) }
        />
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
          onClick={ () => setGenericFilter(resultsFilterNumber()) }
        >
          FILTRAR
        </button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {isFiltered.map((api) => (
            <tr key={ Math.random() }>
              <td>
                {api.name}
              </td>
              <td>
                {api.rotation_period}
              </td>
              <td>
                {api.orbital_period}
              </td>
              <td>
                {api.diameter}
              </td>
              <td>
                {api.climate}
              </td>
              <td>
                {api.gravity}
              </td>
              <td>
                {api.terrain}
              </td>
              <td>
                {api.surface_water}
              </td>
              <td>
                {api.population}
              </td>
              <td>
                {api.films}
              </td>
              <td>
                {api.created}
              </td>
              <td>
                {api.edited}
              </td>
              <td>
                {api.url}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
