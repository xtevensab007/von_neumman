import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import SimulationPanel from './components/SimulationPanel/SimulationPanel';
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/simulation" element={<SimulationRouteWrapper />} />
      </Routes>
    </Router>
  );
  
};

const SimulationRouteWrapper: React.FC = () => {
  const location = useLocation();
  const { operand1, operand2 } = location.state as { operand1: string; operand2: string };

  return <SimulationPanel operand1={operand1} operand2={operand2} />;
};

export default App;