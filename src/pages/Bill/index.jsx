import React from 'react';
import { useBill } from '../../context/AppContext';

export function Bill() {
  const { bills } = useBill();

  const total = () => {
    let total = 0;
    for (let i = 0; i < bills?.items?.length ?? 0; i++) {
      total += bills?.items[i]?.precioItem ?? 0;
    }
    return total;
  };
  const finalPrecio = total();
  return (
    <div>
      <div className="header">
        <div className="divLogoHeader">
          <img className="logoHeader" src="logo.png" />
        </div>
        <div className="divInfoHeader">
          <div className="divInfoHeaderIN">
            <p className="infoHeader">Invoice Number: </p>{' '}
            <p className="_INumber">AZ002</p>
          </div>
          <div className="divInfoHeaderID">
            <p className="infoHeader">Invoice Date: </p>{' '}
            <p className="_INumber">23/04/2022</p>
          </div>
          <div className="divInfoHeaderDD">
            <p className="infoHeader">Due Date: </p>{' '}
            <p className="_INumber">31/04/2022</p>
          </div>
        </div>
        <div className="hBorder"></div>
        <div className="CompanyDetails">
          <div className="divBillTo">
            <p id="billto">Bill to: </p>
            <p id="cname" className="_CompanyName">
              {bills.nombre}
            </p>
            <p id="caddress" className="_CompanyAddress1">
              {bills.calle + ' ' + bills.piso + ' ' + bills.oficina}
            </p>
            <p id="caddress2" className="_CompanyAddress2">
              {'Aquí puse el codigo postal xD: ' + bills.postal}
            </p>
            <p id="cpais" className="_CompanyCountry">
              {bills.pais}
            </p>
          </div>
          <div className="divPaymentDetails">
            <p id="paydet">Payment Details: </p>
            <p id="bname" className="_BankName">
              <b>BANK: </b> {bills.banco}
            </p>
            <p id="iban" className="_IBAN">
              <b>IBAN: </b> {bills.iban}
            </p>
            <p id="swift" className="_SWIFT">
              <b>SWIFT/BIC: </b> {bills.swift}
            </p>
          </div>
        </div>
        <section id="tabla">
          <table>
            <tr className="table-row-dark">
              <th className="td-dark-spacing">Item</th>
              <th className="td-dark-spacing">Description</th>
              <th className="td-dark-spacing">Qty</th>
              <th className="td-dark-spacing">Price</th>
            </tr>
            {bills.items?.map((item) => (
              <>
                <tr id="middle-row">
                  <th className="td-spacing td-edge">
                    {bills.items.indexOf(item) + 1}
                  </th>
                  <td className="td-spacing">{item.descripcionItem}</td>
                  <th className="td-spacing">{item.cantidadItem}</th>
                  <th className="td-spacing td-edge">{item.precioItem}$</th>
                </tr>
              </>
            ))}
            <tr className="table-row-dark">
              <td></td>
              <td></td>
              <td className="td-dark-spacing">total</td>
              <td className="td-dark-spacing">{finalPrecio}$</td>
            </tr>
          </table>
        </section>
        <footer>
          <div id="fBorder1"></div>
          <div id="fBorder2"></div>
        </footer>
      </div>
    </div>
  );
}
