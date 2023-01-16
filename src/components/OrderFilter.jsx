import React, { useContext, useState } from 'react';
import MyContext from '../context/myContext';

function OrderFilter() {
  const {
    colummn,
    genericFilter,
    setGenericFilter,
  } = useContext(MyContext);

  const [sort, setSort] = useState({ order: { column: 'population', sort: 'ASC' } });

  const handleOrder = () => {
    const { order } = sort;
    const elementApi = genericFilter
      .filter((element) => element[order.column] !== 'unknown');
    const elementApiUnknown = genericFilter
      .filter((element) => element[order.column] === 'unknown');
    switch (order.sort) {
    case 'ASC':
      elementApi.sort((a, b) => (a[order.column]) - (b[order.column]));
      break;
    case 'DESC':
      elementApi.sort((a, b) => b[order.column] - a[order.column]);
      break;
    default:
      return true;
    }
    return setGenericFilter([...elementApi, ...elementApiUnknown]);
  };

  return (
    <div>
      <select
        name="column-sort"
        data-testid="column-sort"
        value={ sort.order.column }
        onChange={ ({ target }) => setSort({
          order: { column: target.value, sort: 'ASC' },
        }) }
      >
        {colummn.map((element) => (
          <option key={ element } value={ element }>
            {element}
          </option>
        ))}
      </select>
      <label htmlFor="column-sort-input-asc">
        Ascendente
        <input
          type="radio"
          name="radio-sort"
          data-testid="column-sort-input-asc"
          value="ASC"
          onChange={
            () => setSort({
              order: { column: sort.order.column, sort: 'ASC' },
            })
          }
        />
      </label>
      <label htmlFor="column-sort-input-desc">
        Descendente
        <input
          type="radio"
          name="radio-sort"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={
            () => setSort({
              order: { column: sort.order.column, sort: 'DESC' },
            })
          }
        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => handleOrder() }
      >
        ORDENAR
      </button>
    </div>
  );
}

export default OrderFilter;
