import React from 'react';
import TextField from '@mui/material/TextField'

export function InputGroup(props)
{
    const {title, inputs, catchData, data, errors} = props
    return(
        <>
            <h2>{title}</h2>
            <div className="row">
                {inputs?.map(({name, label, type}) => (
                    <>
                        <div className="col col-lg-3">
                            <TextField
                                id="outline-basic"
                                variant="outlined"
                                error={(!data[name]?.trim()?.length && errors)}
                                type={type}
                                name={name}
                                label={label}
                                value={data[name]}
                                onChange={catchData}
                            />
                        </div>
                    </>
                ))}
            </div>
        </>
    );
}