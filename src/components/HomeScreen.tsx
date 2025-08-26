import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const HomeScreen: React.FC = () => {
  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  

  // Validación simple para asegurarse de que solo se ingrese binario
  const isValidBinary = (input: string) => /^[01]+$/.test(input);

  const handleContinue = () => {
    if (isValidBinary(input1) && isValidBinary(input2)) {
      navigate('/simulation', { state: { operand1: input1, operand2: input2 } });
    } else {
      setError('Por favor, ingrese solo valores binarios (0 y 1).');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '400px' }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Simulador de Máquina de Von Neumann <br/> Operación AND</Card.Title>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group controlId="input1">
              <Form.Label>Entrada Binaria 1:</Form.Label>
              <Form.Control
                type="text"
                value={input1}
                onChange={(e) => setInput1(e.target.value)}
                isInvalid={!!error && !isValidBinary(input1)}
              />
            </Form.Group>
            <Form.Group controlId="input2" className="mt-3">
              <Form.Label>Entrada Binaria 2:</Form.Label>
              <Form.Control
                type="text"
                value={input2}
                onChange={(e) => setInput2(e.target.value)}
                isInvalid={!!error && !isValidBinary(input2)}
              />
            </Form.Group>
            <Button className="mt-4 w-100" variant="primary" onClick={handleContinue}>
              Continuar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomeScreen;