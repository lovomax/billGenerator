import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../context/AppContext';

export function Home() {
  const navigate = useNavigate();
  const { bills, saveBills } = useBill();

  const handleBills = async () => {
    saveBills({ name: 'el pana que le gusta PHP', country: 'spain' });

    navigate('/bill');
  };

  return (
    <div>
      <button onClick={handleBills}>Generar factura</button>
    </div>
  );
}
