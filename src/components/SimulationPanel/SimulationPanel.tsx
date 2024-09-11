import React, { useState, useEffect } from 'react';
import ALU from './components/ALU';
import ControlUnit from './components/ControlUnit';
import Memory from './components/Memory';
import Registers from './components/Registers';
import ProgressPanel from './components/ProgressPanel';
import SimulationControls from './components/SimulationControls';
import useSimulationSteps from '../../hooks/useSimulationSteps';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SimulationPanelProps {
  operand1: string;
  operand2: string; // números binarios
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ operand1, operand2 }) => {
  const { isRunning, step, startSimulation, pauseSimulation, nextStep } = useSimulationSteps();

  const [registerValues, setRegisterValues] = useState<{ reg1: string; reg2: string }>({
    reg1: '',
    reg2: '',
  });
  const [memoryValues, setMemoryValues] = useState<{ [address: number]: string }>({
    0: operand1,
    1: operand2,
    2: '', // Para el resultado de la operación AND
    3: 'AND [0], [1]', // Instrucción almacenada
  });

  // Lógica de la simulación según el paso actual
  const fetchInstruction = () => console.log('Instrucción cargada en la Unidad de Control:', memoryValues[3]);
  const decodeInstruction = () => console.log('Instrucción decodificada: Realizar AND entre valores en memoria [0] y [1].');
  const loadOperandsToRegisters = () => setRegisterValues({ reg1: memoryValues[0], reg2: memoryValues[1] });
  const performALUOperation = (): string => (parseInt(registerValues.reg1, 2) & parseInt(registerValues.reg2, 2)).toString(2).padStart(4, '0');
  const storeResultInMemory = (result: string) => setMemoryValues((prevValues) => ({ ...prevValues, 2: result }));

  // Actualización basada en el paso de la simulación
  useEffect(() => {
    switch (step) {
      case 1:
        fetchInstruction();
        break;
      case 2:
        decodeInstruction();
        break;
      case 3:
        loadOperandsToRegisters();
        break;
      case 4: 
        performALUOperation();
        break;
      case 5: {
        const result = performALUOperation();
        storeResultInMemory(result); // Mover almacenamiento al paso 5
        pauseSimulation();
        break;
      }
      default:
        break;
    }
  }, [step]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Simulador de la Máquina de Von Neumann</h1>
      {/* Deshabilitar botones "Iniciar" o "Pausar" según isRunning */}
      <SimulationControls
        onStart={startSimulation}
        onPause={pauseSimulation}
        onStep={nextStep}
        isRunning={isRunning}
      />
      {isRunning && <p className="text-center text-info">Simulación en curso...</p>}
      <div className="row">
        <div className="col-md-6 mb-4">
          <ProgressPanel step={step} />
          <div className="card mt-4">
            <div className="card-header">Memoria</div>
            <div className="card-body">
              <Memory values={memoryValues} step={step} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <ControlUnit step={step} onStep={nextStep} />
          <ALU operand1={registerValues.reg1} operand2={registerValues.reg2} step={step} />
          <Registers values={registerValues} step={step} />
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;