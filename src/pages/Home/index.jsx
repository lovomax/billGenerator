import React from 'react';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useBill } from '../../context/AppContext';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';



export function Home() {
  const navigate = useNavigate();
  const { bills, saveBills } = useBill();
  const handleBills = async () => {
    const fullBill = { ...data, items };
    console.log(fullBill);
    saveBills(fullBill);
    navigate('/bill');
  };

  /* bills: name, address{country, street, floor, office, postal code}, price?, bank, IBAN, SWIFT/BIC, item[{qty, price, description}]*/
  const [state, setState] = useState();
  const [data, setData] = useState({});
  const [itemData, setItemData] = useState({});
  const [items, setItems] = useState([]);
  var inputs = [
    {
      name: 'descripcionItem',
      label: 'Descripcion',
      tag: 'textarea',
      type: 'textarea',
      error: false
    },
    {name: 'cantidadItem', label: 'Cantidad', tag: 'input', type: 'number', error: false },
    {name: 'precioItem', label: 'Precio', tag: 'input', type: 'number', error: false },
  ];
  const defaulted = {descripcionItem: "", cantidadItem: "", precioItem: ""}

  const catchData = ({ target }) => {
    const { name, value } = target;
    setData((state) => ({ ...state, [name]: value }));
  };
  //REPETICION DE CODIGO, PREGUNTAR A JOSE COMO EVITAR ESTA PARTE
  const catchItemData = ({ target }) => {
    const { name, value } = target;
    setItemData((state) => ({ ...state, [name]: value }));
  };
  const itemRegister = () => {
     if ((itemData.descripcionItem === '' || itemData.cantidadItem === '' || itemData.precioItem === '') || Object.keys(itemData).length === 0){ 
      for (var key in inputs) {
        if (itemData[inputs[key].name] === "" || itemData[inputs[key].name] === null)
        {
          inputs[key].error=!inputs[key].error;
          console.log(inputs[key].error)
          console.log() 
        } 
        /* console.log(inputs[key]) */
        
      }
     }  
      setItems((state) => [
        ...state,
        {
          key: items.length + 1,
          ...itemData,
        },
      ]);
      setItemData(defaulted);
  };
  const itemUpdate = (target) => {
    const obj = { ...target, ...itemData };
    console.log(target);
    setItems(items.map((item) => (item?.key === obj?.key ? obj : item)));
  };
  //Fin de manipulacion de items
  useEffect(() => {
    console.log(inputs);
  }, [inputs]);
  
  return (
    <div>
      <header className="">
        <div className="row align-items-center justify-content-start">
          <div className="col">
            <TextField id="outlined-required" label="Required" required/>
            <img className="logoHeader img-fluid" src="logo.png" />
          </div>
        </div>
      </header>
      <div className="hBorder"></div>
      <section>
        <h1 className="text-center">Datos de La Factura</h1>
        <div className="container-fluid">
          <div id="datosEmpresa">
            <h2>Datos de la Empresa</h2>
            <h3>Nombre de la empresa</h3>
            <div className="row">
              <div className="col col-lg-3">
                <input
                  className="form-control "
                  type="text"
                  name="nombre"
                  placeholder="Tesla"
                  aria-label="nombre de la empresa"
                  onChange={catchData}
                />
              </div>
            </div>
            <h3>Direccion</h3>
            <div className="row">
              <div className="col col-lg-3">
                <h5>Calle</h5>
                <input
                  className="form-control"
                  type="text"
                  name="calle"
                  placeholder="holmberg 4411"
                  aria-label="Calle"
                  onChange={catchData}
                />
              </div>
              <div className="col col-lg-3">
                <h5>Piso</h5>
                <input
                  className="form-control"
                  type="text"
                  name="piso"
                  placeholder="5"
                  aria-label="Piso"
                  onChange={catchData}
                />
              </div>
              <div className="col col-xl-3 col-lg-3">
                <h5> Oficina </h5>
                <input
                  className="form-control"
                  type="text"
                  name="oficina"
                  placeholder="C"
                  aria-label="Oficina"
                  onChange={catchData}
                />
              </div>
              <div className="row">
                <div className="col col-lg-3">
                  <h5>Pais</h5>
                  <input
                    className="form-control "
                    type="text"
                    name="pais"
                    placeholder="España"
                    aria-label="Pais"
                    onChange={catchData}
                  />
                </div>
                <div className="col col-lg-3">
                  <h5>Codigo postal</h5>
                  <input
                    className="form-control "
                    type="text"
                    name="postal"
                    placeholder="7067"
                    aria-label="Codigo Postal"
                    onChange={catchData}
                  />
                </div>
              </div>
            </div>
            <div id="datosPago">
              <h2>Datos del Pago</h2>
              <div className="row">
                <div className="col col-lg-3">
                  <h3>Monto</h3>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="99999"
                    aria-label="monto"
                  />
                </div>
                <div className="col col-lg-3">
                  <h3>Banco</h3>
                  <input
                    className="form-control"
                    type="text"
                    name="banco"
                    placeholder="bdv"
                    aria-label="Banco"
                    onChange={catchData}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col col-lg-3">
                  <h3>IBAN</h3>
                  <input
                    className="form-control"
                    type="text"
                    name="iban"
                    placeholder="sample text"
                    aria-label="IBAN"
                    onChange={catchData}
                  />
                </div>
                <div className="col col-lg-3">
                  <h3>SWIFT/BIC</h3>
                  <input
                    className="form-control"
                    type="text"
                    name="swift"
                    placeholder="sample text"
                    aria-label="SWIFT/BIC"
                    onChange={catchData}
                  />
                </div>
              </div>
            </div>
            <div className="items">
              <h2>Items</h2>
              <div className="row">
                {inputs.map(({ name, label, type, error }) => (
                  <>
                    {' '}
                    {/*name: 'descripcionItem', label:'Descripcion', tag:'textarea', type: 'text'*/}
                    <div className="col col-lg-3">
                      <h3>{label}</h3>
                      <TextField
                        id="outline-basic"
                        variant="outlined"
                        error
                        type={type}
                        name={name}
                        label={label}
                        value={itemData[name]}
                        onChange={catchItemData}
                      />
                    </div>
                  </>
                ))}
              </div>
              {items?.map((item) => (
                <>
                  <p>{item.key}</p>
                  <p>{item.descripcionItem}</p>
                  <p>{item.cantidadItem}</p>
                  <p>{item.precioItem}</p>
                  <button
                    onClick={() => {
                      setItems(() =>
                        items.filter((arr) => arr.key !== item.key)
                      );
                    }}
                  >
                    Borrar Item
                  </button>
                  <button
                    onClick={() => {
                      itemUpdate(item);
                    }}
                  >
                    Editar Item
                  </button>
                  <input
                    type="text"
                    placeholder="descripcion"
                    name="descripcionItem"
                    onChange={catchItemData}
                  />
                  <input
                    type="text"
                    placeholder="cantidad"
                    name="cantidadItem"
                    onChange={catchItemData}
                  />
                  <input
                    type="text"
                    placeholder="precio"
                    name="precioItem"
                    onChange={catchItemData}
                  />
                </>
              ))}
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
