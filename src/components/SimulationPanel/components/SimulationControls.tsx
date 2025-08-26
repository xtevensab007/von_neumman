import React from 'react';

interface SimulationControlsProps {
  onStart: () => void;
  onPause: () => void;
  onStep: () => void;
  isRunning: boolean;
  
}

const SimulationControls: React.FC<SimulationControlsProps> = ({ onStart, onPause, onStep, isRunning }) => {
  return (
    <div className="toolbar d-flex justify-content-center mb-4">
      <button className="btn btn-primary mx-2" onClick={onStart} disabled={isRunning}>
        Iniciar
      </button>
      <button className="btn btn-warning mx-2" onClick={onPause} disabled={!isRunning}>
        Pausar
      </button>
      <button className="btn btn-secondary mx-2" onClick={onStep} disabled={isRunning}>
        Paso a Paso
      </button>
    </div>
  );
};

export default SimulationControls;