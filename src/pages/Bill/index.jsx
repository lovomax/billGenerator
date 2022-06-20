import React, {useRef} from 'react';
import logo from '../../assets/logo.svg';
import { useBill } from '../../context/AppContext';

import Pdf from "react-to-pdf";
const ref = React.createRef();
const options = {
  orientation: 'landscape',
  unit: 'in',
};

import { PDFExport } from '@progress/kendo-react-pdf';

import html2canvas from 'html2canvas';
import {jsPDF} from 'jspdf';

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
  const pdfExportComponent = useRef(null);
  const handleExportWithComponent = (event) =>
  {
    pdfExportComponent.current.save();
  }

  const printDocument = () => {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [Number(canvas.width), Number(canvas.height)]
        });

        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
        // pdf.output('dataurlnewwindow');
         pdf.save("download.pdf"); 
      })
    ;
  }
  
  /*_container_fy0c3_1*/
  return (
    <>
     <Pdf options={options} targetRef={ref} scale={0.89} filename={new Date().getDate() + (new Date().getMonth() + 1) + new Date().getFullYear() + bills.nombre +".pdf"}>
      {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
    </Pdf> *
    <PDFExport 
    fileName="jeje.pdf"
    title=""
    subject=""
    keywords=""
    ref={pdfExportComponent}>
        <div ref={ref} className={styles.container} id='divToPrint'>
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
          {(bills?.items?.length ?? 0) < 5 && (
            <footer className={styles.footerSmall}>
              <div id='fBorder1'></div>
              <div id='fBorder2'></div>
            </footer>    
          )}
          {bills?.items?.length > 5 && (
            <footer className={styles.footer}>
              <div id='fBorder1'></div>
              <div id='fBorder2'></div>
            </footer>
          )}

        </div>
    </PDFExport>
    <button onClick={printDocument}>AAAAAAAAAAAAAAAAAAA</button>
    </>
  );
}
