import { Routes, Route } from 'react-router-dom';
import Scan from './Scan';
import Inventory from './Inventory';
import Statistics from './Statistics';
import List from './List';
import Recipes from './Recipes';
import Profil from './Profil';

const Routing = ({ group }) => {
  return (
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/inventory" element={<Inventory group={group} />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/list" element={<List group={group} />} />
          <Route path="/recipes" element={<Recipes group={group} />} />
          <Route path="/profil" element={<Profil />} />
        </Routes>
    );
  };
  
  export default Routing;