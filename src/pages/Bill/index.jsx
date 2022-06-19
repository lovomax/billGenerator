import React from 'react';
import logo from '../../assets/logo.svg';
import { useBill } from '../../context/AppContext';

import styles from './bill.module.scss';

export function Bill() {
  const { bills } = useBill();

  const total = () => {
    let total = 0;
    for (let i = 0; i < bills?.items?.length ?? 0; i++) {
      total += Number((bills?.items[i]?.precioItem) ?? 0) * Number((bills?.items[i]?.cantidadItem) ?? 1);
    }
    return total;
  };
  const finalPrecio = total();

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <img src={logo} />
          <div className='divInfoHeader'>
            <div className='divInfoHeaderIN'>
              <p className='infoHeader'>Invoice Number: {bills.invoice}</p>
            </div>
            <div className='divInfoHeaderID'>
              <p className='infoHeader'>Invoice Date: {bills.indate}</p>
            </div>
            <div className='divInfoHeaderDD'>
              <p className='infoHeader'>Due Date: {(bills?.duedate?.getDate() + '/' + (bills?.duedate?.getMonth() + 1) + '/' + bills?.duedate?.getFullYear())}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.companyDetails}>
        <div className={styles.paymentDetails}>
          <strong>Bill to: </strong>
          <p>{bills.nombre || 'Ricardo Arreaza'}</p>
          <p>
            {bills.calle ||
              'Calle Pedro Camejo' + ' ' + bills.piso ||
              '9' + ' ' + bills.oficina ||
              '20'}
          </p>
          <p>{bills.postal || '50970-020'}</p>
          <p id='cpais' className='_CompanyCountry'>
            {bills.pais || 'Venezuela'}
          </p>
        </div>
        <div className={styles.paymentDetails}>
          <strong>Payment Details: </strong>
          <p id='bname' className='_BankName'>
            <strong>BANK: </strong> {bills.banco}
          </p>
          <p id='iban' className='_IBAN'>
            <strong>IBAN: </strong> {bills.iban}
          </p>
          <p id='swift' className='_SWIFT'>
            <strong>SWIFT/BIC: </strong> {bills.swift}
          </p>
        </div>
      </div>
      <section>
        <table className={styles.tableContent}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className='td-dark-spacing'>
                <strong>Item</strong>
              </th>
              <th className='td-dark-spacing'>
                <strong>Description</strong>
              </th>
              <th className='td-dark-spacing'>
                <strong>Qty</strong>
              </th>
              <th className='td-dark-spacing'>
                <strong>Price</strong>
              </th>
            </tr>
          </thead>
          <tbody>
            {bills.items?.map((item, index) => (
              <>
                <tr id='middle-row' key={index}>
                  <td className='td-spacing td-edge'>
                    {index + 1}
                  </td>
                  <td className='td-spacing'>{item.descripcionItem}</td>
                  <td className='td-spacing'>{item.cantidadItem}</td>
                  <td className='td-spacing td-edge'>
                    {formatValue(Number(item.precioItem) * Number(item.cantidadItem))}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
          <tfoot>
            <tr className='dark'>
              <td></td>
              <td></td>
              <td className='td-dark-spacing'>Total</td>
              <td className='td-dark-spacing'>{formatValue(finalPrecio)}</td>
            </tr>
          </tfoot>
        </table>
      </section>
      <footer className={styles.footer}>
        <div id='fBorder1'></div>
        <div id='fBorder2'></div>
      </footer>
    </div>
  );
}
