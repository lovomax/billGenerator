import React from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { paises } from '../utils/mock'

import styles from '../pages/Home/home.module.scss'

export function InputGroup(props) {
  const { title, inputs, catchData, data, errors, variant, dueFecha, fechaData } = props;
  return (
    <>
      {title && (
        <h2 className={styles.subTitulo}>{title}</h2>
      )}
      
      <div style={{ display: 'flex', gap: 10 }} className="row">
        {inputs?.map(({ name, label, type, tag }) => (
          <>
            <div key={name}>
              {tag === 'select' && variant === undefined && (
              <FormControl variant="outlined" sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-outlined-label">Paises</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                   value={data[name]} 
                   label="Paises"
                   name={name}
                   onChange={catchData} 
                   error={!data[name]?.trim()?.length && errors}
                >
                 {/*  {paises.map(nacion => (
                    <MenuItem value={nacion}>{nacion}</MenuItem>
                  ))}  */}
                  <MenuItem value="20">20</MenuItem>
                  <MenuItem value="30">30</MenuItem>

                </Select>
              </FormControl>
              )}
              {tag === 'date' && variant === undefined &&(
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    key={name+'_'+tag}
                    label="Due Date"
                    inputFormat="dd/MM/yyyy"
                    value={dueFecha}
                    name={name}
                    onChange={fechaData}
                    renderInput={(params) => <TextField {...params} />}
                    /* error={!data[name]?.trim()?.length && errors} */
                  />
                </LocalizationProvider>
              )}
              {tag === 'input' && variant === undefined && (
              <TextField
                key={name+'_'+tag}
                id="outline-basic"
                variant="outlined"

                error={!data[name]?.trim()?.length && errors}
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={catchData}
              />
              )}
              {variant === 'standard' && (
              <TextField
                key={name+'_'+tag}
                id="outline-basic"
                variant={variant}
                error={!data[name]?.trim()?.length && errors}
                type={type}
                name={name}
                label={label}
                value={data[name]}
                onChange={catchData}
              />
              )}
            </div>
          </>
        ))}
      </div>
    </>
  );
}