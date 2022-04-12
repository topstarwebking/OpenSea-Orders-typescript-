import * as React from 'react';
import { DataGrid, GridCellEditCommitParams, GridCellParams, GridColDef, GridValueGetterParams, MuiBaseEvent, MuiEvent, GridApiRef, GridRowParams } from '@mui/x-data-grid';
import '../static/css/table.css';
import {getTableColumns} from './TableHeader';


export default function DataGridDemo({rows, onCellEditCommit, onCellAllSet}: PropTypes) {
  const handleClickTime = (row: any, field: string, value: number) => {
    console.log('click: ', row, field, value);
    onCellEditCommit({
      field,
      id: row.Id || row.hash,
      value
    }, undefined as MuiEvent);
  }

  const handleClickAll = (row: any, field: string) => {
    console.log('click all: ', row, field);
    onCellAllSet(
      row,
      field
    )
  }

  
  
  return (
    <div style={{ height: 650, width: '100%'}} >
      <DataGrid
        rows={rows}
        columns={getTableColumns(handleClickTime, handleClickAll)}
        pageSize={10}
        getRowId={row => row.hash}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
        onCellEditCommit={(params: GridCellEditCommitParams, event:MuiEvent<MuiBaseEvent>) => onCellEditCommit(params, event)}
        sx={{
          color: 'white'
        }}
      />
    </div>
  );
}
interface PropTypes {
    rows: any[],
    onCellEditCommit: (params: GridCellEditCommitParams, event: MuiEvent<MuiBaseEvent>) => void,
    onCellAllSet: (row: any, field: string) => void,
}