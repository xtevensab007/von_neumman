import React, { useState, useEffect } from 'react';
import ALU from './components/ALU';
import ControlUnit from './components/ControlUnit';
import Memory from './components/Memory';
import Registers from './components/Registers';
import ProgressPanel from './components/ProgressPanel';
import 'bootstrap/dist/css/bootstrap.min.css';

interface SimulationPanelProps {
  operand1: string;
  operand2: string; // números binarios
}

const SimulationPanel: React.FC<SimulationPanelProps> = ({ operand1, operand2 }) => {
  const [isRunning, setIsRunning] = useState(false); // Estado para controlar la simulación automática
  const [step, setStep] = useState<number>(0); // Estado para el paso actual de la simulación
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

  useEffect(() => {
    let timer: number;

    if (isRunning && step < 5) {
      timer = setTimeout(() => {
        setStep((prevStep) => prevStep + 1);
      }, 2000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isRunning, step]);

  const handleStart = () => {
    setIsRunning(true);
    setStep(1);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const fetchInstruction = () => {
    console.log('Instrucción cargada en la Unidad de Control:', memoryValues[3]);
  };

  const decodeInstruction = () => {
    console.log('Instrucción decodificada: Realizar AND entre valores en memoria [0] y [1].');
  };

  const loadOperandsToRegisters = () => {
    setRegisterValues({ reg1: memoryValues[0], reg2: memoryValues[1] });
    console.log('Operandos cargados en los registros:', memoryValues[0], memoryValues[1]); // Mostrar valores directos
  };

  const performALUOperation = (): string => {
    const result = (parseInt(registerValues.reg1, 2) & parseInt(registerValues.reg2, 2))
      .toString(2)
      .padStart(4, '0');
    console.log(`Resultado de la operación AND: ${result}`);
    return result;
  };

  const storeResultInMemory = (result: string) => {
    setMemoryValues((prevValues) => ({ ...prevValues, 2: result }));
    console.log('Resultado almacenado en memoria:', { ...memoryValues, 2: result });
  };

  useEffect(() => {
    if (step === 1) {
      fetchInstruction();
    } else if (step === 2) {
      decodeInstruction();
    } else if (step === 3) {
      loadOperandsToRegisters();
    } else if (step === 4) {
      const result = performALUOperation();
      storeResultInMemory(result);
    } else if (step > 4) {
      setIsRunning(false);
    }
  }, [step]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">Simulador de la Máquina de Von Neumann</h1>
      <div className="toolbar d-flex justify-content-center mb-4">
        <button className="btn btn-primary mx-2" onClick={handleStart}>Iniciar</button>
        <button className="btn btn-warning mx-2" onClick={handlePause}>Pausar</button>
        <button className="btn btn-secondary mx-2" onClick={handleStep}>Paso a Paso</button>
      </div>
      <div className="row">
        {/* Columna Izquierda */}
        <div className="col-md-6 mb-4">
          <ProgressPanel step={step} />
          <div className="card mt-4">
            <div className="card-header">Memoria</div>
            <div className="card-body">
              <Memory values={memoryValues} step={step} />
            </div>
          </div>
        </div>
        {/* Columna Derecha */}
        <div className="col-md-6 mb-4">
          <div className="card mb-4">
            <div className="card-header">Unidad de Control</div>
            <div className="card-body">
              <ControlUnit step={step} onStep={handleStep} />
            </div>
          </div>
          <div className="card mb-4">
            <div className="card-header">ALU</div>
            <div className="card-body">
              <ALU operand1={registerValues.reg1} operand2={registerValues.reg2} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">Registros</div>
            <div className="card-body">
              <Registers values={registerValues} step={step} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationPanel;