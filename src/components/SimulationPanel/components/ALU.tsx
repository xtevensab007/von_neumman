import React, { useEffect, useState } from 'react';
import './components.css';

interface ALUProps {
  operand1: string;
  operand2: string;
  step: number;  // Agregar prop 'step' para manejar el cálculo condicionalmente
  
}

const ALU: React.FC<ALUProps> = ({ operand1, operand2, step }) => {
  const [result, setResult] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (operand1 && operand2 && step === 4) {  // Asegurarse de que solo se calcule en el paso 4
      setIsActive(true);

      const andResult = (parseInt(operand1, 2) & parseInt(operand2, 2))
        .toString(2)
        .padStart(4, '0');
      setResult(andResult);

      console.log(`Resultado de la operación AND: ${andResult}`);

      const timer = setTimeout(() => {
        setIsActive(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setResult('');  // Limpiar el resultado cuando no esté en el paso 4
    }
  }, [operand1, operand2, step]);

  return (
    <div className={`alu ${isActive ? 'alu-active' : ''}`}>
      <h2>Unidad Aritmética Lógica (ALU)</h2>
      <p>Operando 1: {operand1}</p>
      <p>Operando 2: {operand2}</p>
      <p>Resultado (AND): {result}</p>
    </div>
  );
};

export default ALU;