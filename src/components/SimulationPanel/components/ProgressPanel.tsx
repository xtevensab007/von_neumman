import React from 'react';

interface ProgressPanelProps {
  step: number;
}

const ProgressPanel: React.FC<ProgressPanelProps> = ({ step }) => {
  const getMessageForStep = (step: number): string => {
    switch (step) {
      case 1:
        return 'Instrucción cargada en la Unidad de Control.';
      case 2:
        return 'Instrucción decodificada: Realizar AND entre valores en memoria [0] y [1].';
      case 3:
        return 'Operandos cargados en los registros.';
      case 4:
        return 'Operación AND realizada en la ALU y resultado calculado.';
      case 5:
        return 'Resultado almacenado en la memoria.';
      default:
        return 'Inicio de la simulación.';
    }
  };

  return (
    <div className="card">
      <div className="card-header">Progreso de la Simulación</div>
      <div className="card-body">
        <p>{getMessageForStep(step)}</p>
      </div>
    </div>
  );
};

export default ProgressPanel;