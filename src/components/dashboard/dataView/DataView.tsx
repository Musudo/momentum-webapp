import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";
import ContactsDataGrid from './ContactsDataGrid.tsx';
import InstitutionsDataGrid from "./InstitutionsDataGrid.tsx";

const DataView = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Typography component="h2" variant="h5" mb={1}>
                    Contacts
                </Typography>
                <ContactsDataGrid/>
            </Grid>
            <Grid size={12} mt={4}>
                <Typography component="h2" variant="h5" mb={1}>
                    Institutions
                </Typography>
                <InstitutionsDataGrid/>
            </Grid>
        </Grid>
    );
}

export default DataView;