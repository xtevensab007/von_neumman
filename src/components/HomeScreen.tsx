import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const navigate = useNavigate();

  // Validación simple para asegurarse de que solo se ingrese binario
  const isValidBinary = (input: string) => /^[01]+$/.test(input);

  const handleContinue = () => {
    if (isValidBinary(input1) && isValidBinary(input2)) {
      // Navegar a la siguiente vista y pasar los operandos como estado
      navigate('/simulation', { state: { operand1: input1, operand2: input2 } });
    } else {
      alert('Por favor, ingrese solo valores binarios (0 y 1).');
    }
  };

  return (
    <div className="input-panel">
      <h1>Simulador de Máquina de Von Neumann</h1>
      <div>
        <label>
          Entrada Binaria 1:
          <input
            type="text"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Entrada Binaria 2:
          <input
            type="text"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleContinue}>Continuar</button>
    </div>
  );
};

export default HomeScreen;