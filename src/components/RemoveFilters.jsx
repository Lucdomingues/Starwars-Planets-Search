import React, { useContext } from 'react';
import MyContext from '../context/myContext';

function RemoveFilters() {
  const {
    filterArr,
    setFilterArr,
    colummn,
    setColummn,
    setGenericFilter,
    apiResults,
  } = useContext(MyContext);

  return (
    <div>
      <div>
        {filterArr.map((element, index) => (
          <p key={ Math.random() } data-testid="filter">
            {`${element.column} ${element.condition} ${element.value}`}
            <button
              type="button"
              value={ element.column }
              onClick={ () => {
                const cloneArr = [...filterArr];
                cloneArr.splice(index, 1);
                setColummn([...colummn, element.column]);
                setFilterArr(cloneArr);
                setGenericFilter(apiResults);
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
