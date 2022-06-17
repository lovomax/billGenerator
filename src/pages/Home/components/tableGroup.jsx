import React from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {InputGroup} from './inputGroup.jsx'

export function TableGroup(props)
{

    const {items, open, setOpen, setItems, itemUpdate, inputs, catchData, data, errors} = props;

    return(
        <>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          Descripción
                        </TableCell>
                        <TableCell>
                          Cantidad
                        </TableCell>
                        <TableCell>
                          Precio
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items?.map((item) => (
                      <>
                        <TableRow key={item.descripcionItem}>
                          <TableCell>
                            <IconButton
                              aria-label="expand row"
                              size="small"
                              onClick={() => setOpen(item.key)}
                            >
                              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            {item.descripcionItem}
                          </TableCell>
                          <TableCell>
                            {item.cantidadItem}
                          </TableCell>
                          <TableCell>
                            {item.precioItem}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                            <Collapse in={open === item.key} timeout="auto" unmountOnExit>
                              <Box sx={{margin: 1}}>
                                <Table size="small">
                                  <TableBody>
                                    <TableCell>
                                    <button
                                      className="downBtn"
                                      onClick={() => {
                                        setItems(() =>
                                          items.filter((arr) => arr.key !== item.key)
                                        );
                                      }}
                                    >
                                      Borrar Item
                                    </button>
                                    </TableCell>
                                    <TableCell>
                                    <button
                                      className="downBtn"
                                      onClick={() => {
                                        itemUpdate(item);
                                      }}
                                    >
                                      Editar Item
                                    </button>
                                    </TableCell>
                                    <TableCell>
                                      <InputGroup inputs={inputs} catchData={catchData} data={data} errors={errors}/>
                                    </TableCell>
                                  </TableBody>
                                </Table>
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </>
                      ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}