import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        minWidth: 80
    },
    {
        field: 'countryCode',
        headerName: 'Country',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'city',
        headerName: 'City',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'postalCode',
        headerName: 'Postal Code',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'street',
        headerName: 'Street',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'buildingNumber',
        headerName: 'Building Number',
        flex: 1,
        minWidth: 80,
    }
];

