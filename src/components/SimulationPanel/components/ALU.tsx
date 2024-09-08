import React, { useEffect, useState } from 'react';

interface ALUProps {
  operand1: string;
  operand2: string;
}

const ALU: React.FC<ALUProps> = ({ operand1, operand2 }) => {
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    if (operand1 && operand2) {
      const andResult = (parseInt(operand1, 2) & parseInt(operand2, 2))
        .toString(2)
        .padStart(4, '0');
      setResult(andResult);
      console.log(`Resultado de la operación AND: ${andResult}`);
    }
  }, [operand1, operand2]);

  return (
    <div className="alu">
      <h2>Unidad Aritmética Lógica (ALU)</h2>
      <p>Operando 1: {operand1}</p>
      <p>Operando 2: {operand2}</p>
      <p>Resultado (AND): {result}</p>
    </div>
  );
};

export default ALU;