import React from 'react';

interface ControlUnitProps {
  step: number;
  onStep: () => void;
}

const ControlUnit: React.FC<ControlUnitProps> = ({ step, onStep }) => {
  const handleNextStep = () => {
    onStep();
  };

  return (
    <div className="control-unit">
      <h2>Unidad de Control</h2>
      <div className="control-panel">
        <p>Paso actual: {step}</p>
        <button onClick={handleNextStep} disabled={step >= 3}>
          Siguiente Paso
        </button>
      </div>
    </div>
  );
};

export default ControlUnit;