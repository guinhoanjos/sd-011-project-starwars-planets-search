import React from 'react';
import PlanetsProvider from './provider/planetsProvider';
import Table from './components/Table';
import './App.css';

function App() {
  return (
    <PlanetsProvider>
      <header>
        <h1>StarWars Planets</h1>
      </header>
      <Table />
    </PlanetsProvider>
  );
}

export default App;
