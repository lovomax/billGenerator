import React from 'react';
import { useBill } from '../../context/appContext';

function Bill() {
  const { bills } = useBill();

  return <div>Bill</div>;
}

export default Bill;
