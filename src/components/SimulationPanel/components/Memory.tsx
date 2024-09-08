import React from 'react';

interface MemoryProps {
  values: { [address: number]: string };
  step: number;
}

const Memory: React.FC<MemoryProps> = ({ values, step }) => {
  console.log(step);
  
  return (
    <div className="memory">
      <h2>Memoria</h2>
      <table className="memory-table">
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(values).map(([address, value]) => (
            <tr key={address}>
              <td>{address}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Memory;