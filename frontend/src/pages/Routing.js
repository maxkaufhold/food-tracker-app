import { Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Scan from './Scan';
import Inventory from './Inventory';
import Statistics from './Statistics';
import List from './List';
import Recipes from './Recipes';
import Profil from './Profil';

const Routing = () => {
  return (
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/list" element={<List />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
    );
  };
  
  export default Routing;