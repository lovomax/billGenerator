import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {CollapseTable} from './collapseTable.jsx'

export function TableGroup(props) {
  const {
    items,
    setItems,
    itemUpdate,
    inputs,
    catchData,
    data,
    errors,
  } = props;

  return (
    <>
      {items.length > 0 && (
        <>
          <TableContainer component={Paper} sx={{ maxHeight: 200 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Cantidad</TableCell>
                  <TableCell>Precio</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items?.map((item) => (
                  <>
                   <CollapseTable item={item} items={items} setItems={setItems} itemUpdate={itemUpdate} inputs={inputs} catchData={catchData} data={data} errors={errors}/>
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
