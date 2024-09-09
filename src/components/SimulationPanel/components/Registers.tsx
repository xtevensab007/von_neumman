import React, { useEffect, useState } from 'react';
import './components.css';

interface RegistersProps {
  values: { reg1: string; reg2: string };
  step: number;
}

const Registers: React.FC<RegistersProps> = ({ values, step }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    // Determinamos cuándo los registros deben estar activos
    if (step === 1 || step === 2) {
      setIsActive(true);

      const timer = setTimeout(() => {
        setIsActive(false); 
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className={`registers ${isActive ? 'registers-active' : ''}`}>
      <h2 className="text-center">Registros</h2>
      <div className="register">
        <strong>Registro 1 (reg1):</strong> {values.reg1}
      </div>
      <div className="register">
        <strong>Registro 2 (reg2):</strong> {values.reg2}
      </div>
    </div>
  );
};

export default Registers;