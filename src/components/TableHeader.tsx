import { GridColDef, GridRowParams, GridValueSetterParams } from "@mui/x-data-grid"
import { format } from "date-fns";
import { BigNumber } from "@ethersproject/bignumber";
import { formatEther } from "@ethersproject/units";

function setexpirationTime(params: GridValueSetterParams, value: number) {
  const date = new Date(new Date().getTime() + value);
  return { ...params.row, expirationTime: date };
}

const handeImageClick = (path: string) => {
  console.log('opensealink: ', path)
  window.open(
    path,
    '_blank' // <- This is what makes it open in a new window.
  );
}

export const getTableColumns = (handleClickTime: (row: any, field: string, value: number) => void, 
  handleClickAll: (row:any, filed: string) => void
) => {
  const columns: GridColDef[] = [
    {field: 'imageUrlThumbnail', headerClassName: 'text-cell-header', headerName: 'Image', width: 90, renderCell: (params) =><img onClick={() => handeImageClick(params.row.openseaLink)} className="row-image" src={params.value ? (params.value) : ''} />,},
    { field: 'tokenId', headerName: 'ID', width: 120, renderCell: (params) => params?.value, headerClassName: 'text-cell-header'},
    {
      field: 'rank',
      headerName: 'Rank',
      width: 100,
      headerClassName: 'text-cell-header',
      renderCell: (params) => params.value || 0
    },
    {
      field: 'currentPrice',
      headerName: 'OS Price',
      width: 120,
      headerClassName: 'text-cell-header',
      renderCell: (params) => <span>{params.value ? formatEther(params.value.toString()): '--'}</span>
    },
    {
      field: 'amount',
      headerName: 'Bid Price (ETH)',
      width: 150,
      type:'number',
      headerClassName: 'text-cell-header',
      editable: true,
      renderCell: (params) => {
        return <div className="bid-amount-view">{params.value || 0}</div>
      }
    },
    {
      field: '1',
      headerName: '',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickAll(params.row, "amount")}> Set All</button>, 
      headerClassName: 'text-cell-header',
      width: 90,
    },
    {
      field: 'expirationTime',
      headerName: 'Expiry',
      headerClassName: 'text-cell-header',
      width: 180,
      type: 'dateTime',
      renderCell: ({value}) => {
        return <span className="date-view">{value && format(new Date(value), 'dd/MM/yyyy hh:ss') || 'None'}</span>
      },
      editable:true
    },
    {
      field: '2',
      headerClassName: 'text-cell-header',
      headerName: '',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickTime(params.row, "expirationTime" , new Date().getTime() + 30 * 60 * 1000)}>30m</button>, 
      width: 90,
    },
    {
      field: '3',
      headerClassName: 'text-cell-header',
      headerName: '',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickTime(params.row, "expirationTime" , new Date().getTime() + 60 * 60 * 1000)}>1h</button>, 
      width: 90,
    },
    {
      field: '4',
      headerClassName: 'text-cell-header',
      headerName: '',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickTime(params.row, "expirationTime" , new Date().getTime() + 4 * 60 * 60 * 1000)}>4h</button>, 
      width: 90,
    },
    {
      headerClassName: 'text-cell-header',
      field: '5',
      headerName: '',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickTime(params.row, "expirationTime" , new Date().getTime() + 12 * 60 * 60 * 1000)}>12h</button>, 
      width: 90,
    },
    {
      field: '6',
      headerName: '',
      headerClassName: 'text-cell-header',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickTime(params.row, "expirationTime" , new Date().getTime() + 24 * 60 * 60 * 1000)}>24h</button>, 
      width: 90,
    },
    {
      field: '7',
      headerName: '',
      headerClassName: 'text-cell-header',
      renderCell: (params) => <button className="btn btn-cell" onClick={() => handleClickAll(params.row, "expirationTime")}>Set All</button>, 
      width: 90,
    },
  //   {
  //     field: 'fullName',
  //     headerName: 'Full name',
  //     description: 'This column has a value getter and is not sortable.',
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params: GridValueGetterParams) =>
  //       `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  //   },
  ];

  return columns;
}
