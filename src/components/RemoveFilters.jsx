import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function RemoveFilters() {
  const {
    filterArr,
    setFilterArr,
  } = useContext(MyContext);

  return (
    <div>
      <div>
        {filterArr.map((element) => (
          <p key={ Math.random() } data-testid="filter">
            {`${element.column} ${element.condition} ${element.value}`}
            <button
              type="button"
              onClick={ () => {
                setFilterArr(
                  filterArr.filter((elements) => elements.column !== element.column),
                );
                console.log(filterArr);
              } }
            >
              X
            </button>
          </p>
        ))}
      </div>
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => setFilterArr([]) }
        >
          REMOVER FILTROS
        </button>
      </div>
    </div>
  );
}

export default RemoveFilters;
