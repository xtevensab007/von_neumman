import React, { useEffect, useState } from 'react';
import './components.css';

interface ControlUnitProps {
  step: number;
  onStep: () => void;
}

const ControlUnit: React.FC<ControlUnitProps> = ({ step, onStep }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Activar la unidad de control en el paso actual
    if (step >= 0 && step <= 3) {
      setIsActive(true);
      
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNextStep = () => {
    onStep();
  };

  return (
    <div className={`control-unit ${isActive ? 'control-unit-active' : ''}`}>
      <h2 className="text-center">Unidad de Control</h2>
      <div className="control-panel">
        <p>Paso actual: {step}</p>
        <button 
          onClick={handleNextStep} 
          disabled={step >= 3} 
          className="btn btn-primary"
        >
          Siguiente Paso
        </button>
      </div>
    </div>
  );
};

export default ControlUnit;