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
    if (step >= 1 && step <= 4) {
      setIsActive(true);
      
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIsActive(false);
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
          disabled={step >= 5}  // Permitir avanzar hasta el paso 5
          className="btn btn-primary"
        >
          Siguiente Paso
        </button>
      </div>
    </div>
  );
};

export default ControlUnit;