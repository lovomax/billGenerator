import React from 'react';
import { useBill } from '../../context/AppContext';

export function Bill() {
  const { bills } = useBill();

  return <div>Bill</div>;
}
