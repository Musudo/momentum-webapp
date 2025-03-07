import {GridColDef} from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'firstName',
        headerName: 'First Name',
        flex: 1,
        minWidth: 80
    },
    {
        field: 'lastName',
        headerName: 'Last Name',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'email',
        headerName: 'Email',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'phone',
        headerName: 'Phone',
        flex: 1,
        minWidth: 80,
    },
    {
        field: 'jobTitle',
        headerName: 'Job Title',
        flex: 1,
        minWidth: 80,
    }
];

