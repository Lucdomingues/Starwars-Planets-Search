import React, { useContext, useEffect } from 'react';
import MyContext from '../context/myContext';
import NameFilter from './NameFilter';
import NumberFilter from './NumberFilter';

function Table() {
  const {
    apiResults,
    inputName,
    genericFilter,
    setGenericFilter,
    filterArr,
  } = useContext(MyContext);

  useEffect(() => { setGenericFilter(apiResults); }, [apiResults]);

  useEffect(() => {
    setGenericFilter(apiResults
      .filter((element) => element.name.includes(inputName)));
  }, [inputName]);

  useEffect(() => {
    let filterCondition = [];
    filterArr.forEach((element) => {
      switch (element.condition) {
      case 'maior que':
        filterCondition = genericFilter
          .filter((api) => +api[element.column] > +element.value);
        break;
      case 'igual a':
        filterCondition = genericFilter
          .filter((api) => +api[element.column] === +element.value);
        break;
      case 'menor que':
        filterCondition = genericFilter
          .filter((api) => +api[element.column] < +element.value);
        break;
      default:
        return true;
      }
    });
    setGenericFilter(filterCondition);
  }, [filterArr]);

  const isFiltered = genericFilter.length > 0 ? genericFilter : apiResults;

  return (
    <div>
      <form>
        <NameFilter />
        <NumberFilter />
      </form>
      <div>
        {filterArr.map((element) => (
          <p key={ Math.random() }>
            test
            {`${element.column} ${element.condition} ${element.value}`}
          </p>
        ))}
      </div>
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
