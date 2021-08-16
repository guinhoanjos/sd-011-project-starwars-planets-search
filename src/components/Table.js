import React, { useContext, useEffect } from 'react';
import planetsContext from '../provider/planetsContext';
import Filter from './Filter';

function Table() {
  const {
    planets,
    setFilterPlanets,
    filterPlanets,
    changeFilter,
    filters,
    keys,
    pointName,
    filters: { filterByNumericValues },
  } = useContext(planetsContext);

  function returnComparison(column, comparison, value, planet) {
    if (comparison === 'maior que') {
      return parseFloat(planet[column]) > parseFloat(value);
    }
    if (comparison === 'menor que') {
      return parseFloat(planet[column]) < parseFloat(value);
    }
    if (comparison === 'igual a') {
      return parseFloat(planet[column]) === parseFloat(value);
    }
  }
  useEffect(() => {
    if (planets !== undefined) {
      const filterName = filters.filterByName.name;
      let newFilter = planets.filter(({ name }) => name.includes(filterName));
      if (filterByNumericValues.length > 0) {
        filterByNumericValues.forEach(({ column, comparison, value }) => {
          newFilter = newFilter.filter((planet) => (
            returnComparison(column, comparison, value, planet)
          ));
        });
      }
      setFilterPlanets(newFilter);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planets, pointName, filters]);

  if (filterPlanets !== undefined && keys !== undefined) {
    return (
      <>
        <input
          type="text"
          data-testid="name-filter"
          onChange={ (event) => { changeFilter(event); } }
        />
        <Filter />
        <table>
          <tr>
            {keys.map((key) => <th key={ key }>{key}</th>)}
          </tr>
          {
            filterPlanets.map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>

            ))
          }
        </table>
      </>
    );
  }
  return <h3>Loading...</h3>;
}

export default Table;
