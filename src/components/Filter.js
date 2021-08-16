import React, { useState, useContext } from 'react';
import planetsContext from '../provider/planetsContext';

function Filter() {
  const [filter, setFilterNumber] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [options, setOptions] = useState({
    population: false,
    orbital_period: false,
    diameter: false,
    rotation_period: false,
    surface_water: false,
  });
  const {
    setFilters,
    filters,
    filters: { filterByNumericValues },
  } = useContext(planetsContext);

  function optionsFunction(type) {
    if (!options[type]) {
      return <option>{type}</option>;
    }
  }

  function changeColumn(event) {
    setFilterNumber({
      ...filter,
      column: event.target.value,
    });
  }
  function changeComparison(event) {
    setFilterNumber({
      ...filter,
      comparison: event.target.value,
    });
  }
  function changeNumber(event) {
    setFilterNumber({
      ...filter,
      value: event.target.value,
    });
  }
  function dispatchFilter() {
    const newFilter = filters.filterByNumericValues;
    newFilter.push(filter);
    setFilters({
      ...filters,
      filterByNumericValues: newFilter,
    });
    setOptions({
      ...options,
      [filter.column]: true,
    });
  }
  function deleteFilter({ target }) {
    const { dataset: { indexfilter, typeofcolumn } } = target;
    const newArray = filters.filterByNumericValues;
    newArray.splice(indexfilter, 1);
    setFilters({
      ...filters,
      filterByNumericValues: newArray,
    });
    setOptions({
      ...options,
      [typeofcolumn]: false,
    });
  }
  return (
    <>
      {
        (filterByNumericValues.length > 0) ? (
          filterByNumericValues.map(({ column, comparison, value }, key) => (
            <span data-testid="filter" key={ key }>
              <p>{` ${column} ${comparison} ${value}`}</p>
              <button
                data-typeofcolumn={ column }
                data-indexFilter={ key }
                type="button"
                onClick={ (event) => { deleteFilter(event); } }
              >
                X
              </button>
            </span>
          ))
        ) : (
          <h4>Sem filtro</h4>
        )
      }
      <form>
        <select
          data-testid="column-filter"
          onChange={ (event) => changeColumn(event) }
        >
          {optionsFunction('population')}
          {optionsFunction('orbital_period')}
          {optionsFunction('diameter')}
          {optionsFunction('rotation_period')}
          {optionsFunction('surface_water')}
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ (event) => changeComparison(event) }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          onChange={ (event) => changeNumber(event) }
        />
        <button
          type="reset"
          data-testid="button-filter"
          onClick={ () => { dispatchFilter(); } }
        >
          Filtrar
        </button>
      </form>
    </>
  );
}

export default Filter;
