import React from 'react';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../context/AppContext';
import { useState, useEffect } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import { InputGroup } from '../../components/inputGroup';
import {
  inputdata2,
  iDataDir,
  inputdata,
  inputs,
  defaulted,
  defaultData,
} from './utils/mock.js';
import { TableGroup } from '../../components/tableGroup';

export function Home() {
  const navigate = useNavigate();
  const { bills, saveBills } = useBill();
  const handleBills = async () => {
    if (items.length > 0) {
      if (
        Object.keys(data).length &&
        Object.values(data).some((item) => !item.length)
      ) {
        setDataErrors(true);
      } else {
        const fullBill = { ...data, items, indate: fecha };
        console.log(fullBill);
        saveBills(fullBill);
        navigate('/bill');
      }
    } else {
      setAlert(true);
    }
  };
  /**/
  /* bills: name, address{country, street, floor, office, postal code}, price?, bank, IBAN, SWIFT/BIC, item[{qty, price, description}]*/
  const [data, setData] = useState({ ...defaultData });
  const [itemUpdates, setItemUpdates] = useState({});
  const [itemData, setItemData] = useState({});
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState(false);
  const [errorsUpdate, setErrorsUpdate] = useState(false);
  const [dataErrors, setDataErrors] = useState(false);
  const [open, setOpen] = useState();
  const [alert, setAlert] = useState(false);
  var hoy = new Date(),
    fecha =
      hoy.getDate() + '/' + (hoy.getMonth() + 1) + '/' + hoy.getFullYear();

  const catchData = ({ target }) => {
    const { name, value } = target;
    if (
      !Number(value[value.length - 1]) ||
      name === 'calle' ||
      name === 'piso' ||
      name === 'oficina' ||
      name === 'postal' ||
      name === 'duedate' ||
      name === 'invoice' ||
      name === 'iban'
    ) {
      setData((state) => ({ ...state, [name]: value }));
    }
  };
  //REPETICION DE CODIGO, PREGUNTAR A JOSE COMO EVITAR ESTA PARTE
  const catchItemData = ({ target }) => {
    const { name, value } = target;
    setItemData((state) => ({ ...state, [name]: value }));
  };
  const catchItemUpdate = ({ target }) => {
    const { name, value } = target;
    setItemUpdates((state) => ({ ...state, [name]: value }));
  };
  const itemRegister = () => {
    if (
      (itemData?.descripcionItem ?? '') === '' ||
      (itemData?.cantidadItem ?? '') === '' ||
      (itemData?.precioItem ?? '') === ''
    ) {
      setErrors(true);
    } else {
      setItems((state) => [
        ...state,
        {
          key: Math.random().toString(35).slice(2, 10),
          ...itemData,
        },
      ]);
      setErrors(false);
      setItemData(defaulted);
    }
  };
  const itemUpdate = (target) => {
    const obj = { ...target, ...itemUpdates };
    if (
      (itemUpdates?.descripcionItem ?? '') === '' ||
      (itemUpdates?.cantidadItem ?? '') === '' ||
      (itemUpdates?.precioItem ?? '') === ''
    ) {
      setErrorsUpdate(true);
    } else {
      setItems(items.map((item) => (item?.key === obj?.key ? obj : item)));
      setErrorsUpdate(false);
      setItemUpdates(defaulted);
    }
  };
  //Fin de manipulacion de items
  useEffect(() => {
    console.log(alert);
  }, [alert]);

  return (
    <div>
      {alert && (
        <>
          <Collapse in={alert}>
            <Alert
              severity="warning"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlert(false);
                  }}
                  sx={{ mb: 2 }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              ¡Parece que no tienes ningún ítem registrado!
            </Alert>
          </Collapse>
        </>
      )}
      <header className="">
        <div className="row align-items-center justify-content-start">
          <div className="col">
            {/* <TextField id="outlined-required" label="Required" required /> */}
            <img className="logoHeader img-fluid" src="logo.png" />
          </div>
        </div>
      </header>
      <div className="hBorder"></div>
      <section>
        <h1 className="text-center">Datos de La Factura</h1>
        <div className="container-fluid">
          <div id="datosEmpresa">
            <div className="datosBasicos">
              <InputGroup
                title="Datos Básicos"
                inputs={inputdata2}
                catchData={catchData}
                data={data}
                errors={dataErrors}
              />
            </div>
            <div className="datosDireccion">
              <InputGroup
                title="Dirección"
                inputs={iDataDir}
                catchData={catchData}
                data={data}
                errors={dataErrors}
              />
            </div>
            <div className="datosPago">
              <InputGroup
                title="Datos del Pago"
                inputs={inputdata}
                catchData={catchData}
                data={data}
                errors={dataErrors}
              />
            </div>
            <div className="items">
              <InputGroup
                title="Items"
                inputs={inputs}
                catchData={catchItemData}
                data={itemData}
                errors={errors}
              />

              <TableGroup
                items={items}
                open={open}
                setOpen={setOpen}
                setItems={setItems}
                itemUpdate={itemUpdate}
                inputs={inputs}
                catchData={catchItemUpdate}
                data={itemUpdates}
                errors={errorsUpdate}
              />

              <div className="botonsito">
                <button id="addItem" className="downBtn" onClick={itemRegister}>
                  Añadir Item
                </button>
                <button className="downBtn" onClick={handleBills}>
                  Generar Factura
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
