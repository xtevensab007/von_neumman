import React from 'react';

interface RegistersProps {
  values: { reg1: string; reg2: string }; 
  step: number;
}

const Registers: React.FC<RegistersProps> = ({ values, step }) => {
  console.log(step);
  
  return (
    <div className="registers">
      <h2>Registros</h2>
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