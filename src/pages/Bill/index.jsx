import React, {useRef} from 'react';
import logo from '../../assets/logo.svg';
import { useBill } from '../../context/AppContext';

import ReactToPrint from 'react-to-print';

import styles from './bill.module.scss';

export function Bill() {
  /*React to print*/

  const componentRef = React.useRef(null);
  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button>Print using a Functional Component</button>;
  }, []);

  /*React to print end */
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
      currency: bills?.moneda ?? "EUR",
    }).format(value);
  };

  
  /*_container_fy0c3_1*/
  return (
    <>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="AwesomeFileName.pdf"
        trigger={reactToPrintTrigger}
        style={{ fontWeight: 'bold' }}
      />
        <div ref={componentRef} className={styles.container} id='divToPrint'>
          <div className={styles.header}>
            <div>
              <img src={logo} />
              <div className='divInfoHeader'>
                <div className='divInfoHeaderIN'>
                  <p className='infoHeader' style={{ textAlign: 'right' }}><strong>Invoice Number:</strong> {bills.invoice}</p>
                </div>
                <div className='divInfoHeaderID'>
                  <p className='infoHeader' style={{ textAlign: 'right' }}><strong>Invoice Date:</strong> {bills.indate}</p>
                </div>
                <div className='divInfoHeaderDD'>
                  <p className='infoHeader' style={{ textAlign: 'right' }}><strong>Due Date:</strong> {(bills?.duedate?.getDate() + '/' + (bills?.duedate?.getMonth() + 1) + '/' + bills?.duedate?.getFullYear())}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.companyDetails}>
            <div className={styles.paymentDetails}>
              <strong>Bill to: </strong>
              <p>{bills.nombre || 'Ricardo Arreaza'}</p>
              <p>
                {bills.calle  + ' ' + bills.piso  + ' ' + bills.oficina}
              </p>
              <p>{bills.postal || '50970-020'}</p>
              <p id='cpais' className='_CompanyCountry'>
                {bills.pais || 'Venezuela'}
              </p>
            </div>
            <div className={styles.paymentDetails}>
              <strong>Payment Details: </strong>
              <p id='bname' className='_BankName' style={{ textAlign: 'right' }}>
                <strong>BANK: </strong> {bills.banco}
              </p>
              <p id='iban' className='_IBAN' style={{ textAlign: 'right' }}>
                <strong>IBAN: </strong> {bills.iban}
              </p>
              <p id='swift' className='_SWIFT' style={{ textAlign: 'right' }}>
                <strong>SWIFT/BIC: </strong> {bills.swift}
              </p>
            </div>
          </div>
          <section>
            <table className={styles.tableContent}>
              <thead>
                <tr className={styles.tableHeader}>
                  <th className={styles.itemH}>
                    <strong>Item</strong>
                  </th>
                  <th className='td-dark-spacing'>
                    <strong>Description</strong>
                  </th>
                  <th className={styles.qty}>
                    <strong>Qty</strong>
                  </th>
                  <th className={styles.price}>
                    <strong>Price</strong>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bills.items?.map((item, index) => (
                  <>
                    <tr id='middle-row' key={index}>
                      <td className={styles.itemH}>
                        {index + 1}
                      </td>
                      <td className='td-spacing'>{item.descripcionItem}</td>
                      <td className={styles.qty}>{item.cantidadItem}</td>
                      <td className={styles.price}>
                        {formatValue(Number(item.precioItem))}
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

            <footer className={styles.footerSmall}>
              <div id='fBorder1'></div>
              <div id='fBorder2'></div>
            </footer>    

{/*           
            <footer className={styles.footer}>
              <div className={styles.fBorder1}></div>
              <div className={styles.fBorder2}></div>
            </footer>   
          {bills?.items?.length > 5 && (
            <footer className={styles.footer}>
              <div id='fBorder1'></div>
              <div id='fBorder2'></div>
            </footer>
          )} */}

        </div>
    </>
  );
}
