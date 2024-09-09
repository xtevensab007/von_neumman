import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import './components.css';

interface MemoryProps {
  values: { [address: number]: string };
  step: number;
}

const Memory: React.FC<MemoryProps> = ({ values, step }) => {
  const [isActive, setIsActive] = useState<boolean>(false); // Estado para manejar si la memoria está activa

  useEffect(() => {
    if (step === 1 || step === 2 || step === 5) {
      setIsActive(true);
      
      const timer = setTimeout(() => {
        setIsActive(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step]);

  return (
    <div className={`memory ${isActive ? 'memory-active' : ''}`}>
      <h2 className="text-center mb-4">Memoria</h2>
      <Row xs={1} md={3} className="g-4">
        {Object.entries(values).map(([address, value]) => {
          const borderColor =
            step === 1 && parseInt(address) <= 1
              ? 'primary'
              : step === 2 && parseInt(address) === 2
              ? 'success'
              : 'secondary';

          // Define el título del card basado en la dirección de memoria
          let cardTitle;
          if (address === '0') {
            cardTitle = 'Valor 1';
          } else if (address === '1') {
            cardTitle = 'Valor 2';
          } else if (address === '2') {
            cardTitle = 'Resultado';
          } else if (address === '3'){
            cardTitle = 'Instrucción';
          }else {
            cardTitle = 'Valor';
          }

          return (
            <Col key={address}>
              <Card border={borderColor} className="text-center">
                <Card.Header>Dirección: {address}</Card.Header>
                <Card.Body>
                  <Card.Title>{cardTitle}</Card.Title>
                  <Card.Text className="fs-4">{value || '0'}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Memory;