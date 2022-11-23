import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/myContext';

function Table() {
  const context = useContext(MyContext);
  const [apiResults, setApiResults] = useState([]);

  useEffect(() => {
    async function responseApi() {
      const response = await context.apiResponse;
      setApiResults(response);
    }
    responseApi();
  }, [context.apiResponse]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>name</th>
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
          {apiResults.map((api) => (
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
