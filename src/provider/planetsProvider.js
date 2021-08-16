import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import planetsContext from './planetsContext';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState();
  const [keys, setKeys] = useState();
  const [filterPlanets, setFilterPlanets] = useState();
  const [filters, setFilters] = useState({
    filterByName: {
      name: '',
    },
    filterByNumericValues: [],
  });
  const [pointName, setPointName] = useState();
  function changeFilter({ target: { value } }) {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
    setPointName({ value });
  }
  useEffect(() => {
    const getPlanets = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const fetchPlanets = await fetch(endpoint).then((data) => data.json());
      const totalkeys = Object.keys(fetchPlanets.results[0]);
      setKeys((totalkeys).filter((key) => key !== 'residents'));
      setPlanets(fetchPlanets.results);
    };
    getPlanets();
  }, []);
  const context = {
    planets,
    setPlanets,
    setFilterPlanets,
    filterPlanets,
    filters,
    changeFilter,
    keys,
    setFilters,
    pointName,
  };
  return (
    <planetsContext.Provider value={ context }>
      {children}
    </planetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PlanetsProvider;
