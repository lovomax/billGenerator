import React from "react";
import { render } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useBill } from "../../context/AppContext";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { InputGroup } from "./components/inputGroup";

export function Home() {
  const navigate = useNavigate();
  const { bills, saveBills } = useBill();
  const handleBills = async () => {

      if (Object.keys(data).length && !!Object.values(data).filter(i => !i.length).length) {
        setDataErrors(true);
      } else {
        const fullBill = { ...data, items };
        console.log(fullBill);
        saveBills(fullBill);
        navigate("/bill");
      }
  };
 /**/
  /* bills: name, address{country, street, floor, office, postal code}, price?, bank, IBAN, SWIFT/BIC, item[{qty, price, description}]*/
  const [data, setData] = useState({});
  const [itemData, setItemData] = useState({});
  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState(false);
  const [dataErrors, setDataErrors] = useState(false);
  const inputdata2 =[
    {
      name: 'nombre',
      label: 'Nombre de la Empresa',
      tag: 'input',
      type: 'text'
    }
  ]
  const iDataDir = [
    {
      name: 'calle',
      label: 'Calle',
      tag: 'input',
      type: 'text'
    },
    {
      name: 'piso',
      label: 'Piso',
      tag: 'input',
      type: 'text'
    },
    {
      name: 'oficina',
      label: 'Oficina',
      tag: 'input',
      type: 'text'
    },
    {
      name: 'pais',
      label: 'Pais',
      tag: 'input',
      type: 'text'
    },
    {
      name: 'postal',
      label: 'Postal',
      tag: 'input',
      type: 'text'
    }
  ]
  const inputdata = [
    {
      name: "banco",
      label: "Banco",
      tag: "input",
      type: "text"
    },
    {
      name: "iban",
      label: "IBAN",
      tag: "input",
      type: "text"
    },
    {
      name: "swift",
      label: "SWIFT/BIC",
      tag: "input",
      type: "text"
    }
  ]
  const inputs = [
    {
      name: "descripcionItem",
      label: "Descripcion",
      tag: "textarea",
      type: "textarea"
    },
    {
      name: "cantidadItem",
      label: "Cantidad",
      tag: "input",
      type: "number"
    },
    {
      name: "precioItem",
      label: "Precio",
      tag: "input",
      type: "number"
    }
  ];
  const defaulted = { descripcionItem: "", cantidadItem: "", precioItem: "" };

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
    if (
      (itemData?.descripcionItem ?? '') === "" ||
      (itemData?.cantidadItem ?? '') === "" ||
      (itemData?.precioItem ?? '') === "" 
    ) {
      setErrors(true);
    } else {
      setItems((state) => [
        ...state,
        {
          key: items.length + 1,
          ...itemData
        }
      ]);
      setErrors(false);
      setItemData(defaulted);
    }


  };
  const itemUpdate = (target) => {
    const obj = { ...target, ...itemData };

    setItems(items.map((item) => (item?.key === obj?.key ? obj : item)));
  };
  //Fin de manipulacion de items
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  var a;
  return (
    <div>
      <header className="">
        <div className="row align-items-center justify-content-start">
          <div className="col">
            <TextField id="outlined-required" label="Required" required />
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
              <InputGroup title="Datos de la Empresa" inputs={inputdata2} catchData={catchData} data={data} errors={dataErrors}/>
            </div>
            <div className="datosDireccion">
              <InputGroup title="Dirección" inputs={iDataDir} catchData={catchData} data={data} errors={dataErrors}/>
            </div>
            <div className="datosPago">
              <InputGroup title="Datos del Pago" inputs={inputdata} catchData={catchData} data={data} errors={dataErrors}/>
            </div>
            <div className="items">
              <InputGroup title="Items" inputs={inputs} catchData={catchItemData} data={itemData} errors={errors}/>

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
