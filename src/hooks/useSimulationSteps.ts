import { useState, useEffect } from 'react';

interface UseSimulationSteps {
  isRunning: boolean;
  step: number;
  startSimulation: () => void;
  pauseSimulation: () => void;
  nextStep: () => void;
}

const useSimulationSteps = (): UseSimulationSteps => {
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState<number>(0);

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

  const startSimulation = () => {
    setIsRunning(true);
    setStep(1);
  };

  const pauseSimulation = () => {
    setIsRunning(false);
  };

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  return {
    isRunning,
    step,
    startSimulation,
    pauseSimulation,
    nextStep,
  };
};

export default useSimulationSteps;