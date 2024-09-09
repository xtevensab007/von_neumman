import React, { useState, useEffect } from 'react';
import ALU from './components/ALU';
import ControlUnit from './components/ControlUnit';
import Memory from './components/Memory';
import Registers from './components/Registers';
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
  });

  useEffect(() => {
    let timer: number;

    if (isRunning && step < 3) {
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

  const loadOperandsToRegisters = () => {
    // Paso 1: Cargar operandos desde la memoria a los registros
    setRegisterValues({ reg1: memoryValues[0], reg2: memoryValues[1] });
    console.log('Operandos cargados en los registros:', registerValues);
  };

  const performALUOperation = (): string => {
    // Paso 2: Realizar operación AND en la ALU
    const result = (parseInt(registerValues.reg1, 2) & parseInt(registerValues.reg2, 2))
      .toString(2)
      .padStart(4, '0');
    console.log(`Resultado de la operación AND: ${result}`);
    return result;
  };

  const storeResultInMemory = (result: string) => {
    // Paso 3: Almacenar el resultado de la ALU en la memoria
    setMemoryValues((prevValues) => ({ ...prevValues, 2: result }));
    console.log('Resultado almacenado en memoria:', { ...memoryValues, 2: result });
  };

  // Control de los pasos de la simulación
  useEffect(() => {
    if (step === 1) {
      loadOperandsToRegisters();
    } else if (step === 2) {
      const result = performALUOperation();
      storeResultInMemory(result);
    } else if (step > 2) {
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
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Memoria</div>
            <div className="card-body">
              <Memory values={memoryValues} step={step} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">Unidad de Control</div>
            <div className="card-body">
              <ControlUnit step={step} onStep={handleStep} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-header">ALU</div>
            <div className="card-body">
              <ALU operand1={registerValues.reg1} operand2={registerValues.reg2} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
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