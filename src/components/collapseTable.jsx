import React, { useState } from 'react'

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import SendIcon from '@mui/icons-material/Send';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import {InputGroup} from './inputGroup.jsx';

export function CollapseTable (props)
{
    const { item, items, setItems, itemUpdate, inputs, catchData, data, errors } = props
    const [open, setOpen] = useState(false);
    return(
        <>
                <TableRow key={item.descripcionItem}>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                        onClick={() => setOpen(!open)}
                        >
                          {(open) ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{item.descripcionItem}</TableCell>
                      <TableCell>{item.cantidadItem}</TableCell>
                      <TableCell>{item.precioItem}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={6}
                      >
                        <Collapse
                          in={open}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 1 }}>
                            <Table size="small">
                              <TableBody>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    color="error"
                                    className="downBtn"
                                    startIcon={<DeleteIcon />}
                                    
                                    onClick={() => {
                                      setItems(() =>
                                        items.filter(
                                          (arr) => arr.key !== item.key
                                        )
                                      );
                                    }}
                                  >
                                    Borrar
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    variant="contained"
                                    startIcon={<UpdateIcon />}
                                    className="downBtn"
                                    onClick={() => {
                                      itemUpdate(item);
                                    }}
                                  >
                                    Actualizar
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <InputGroup
                                    inputs={inputs}
                                    catchData={catchData}
                                    data={data}
                                    errors={errors}
                                    variant="standard"
                                  />
                                </TableCell>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
        </>
    );
}